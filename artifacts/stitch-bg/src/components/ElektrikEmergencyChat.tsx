import { useEffect, useRef, useState } from "react";

type ChatRole = "assistant" | "user";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  tone?: "default" | "error";
};

type ChatResponse = {
  reply?: string;
  error?: string;
};

const apiUrl = (import.meta.env.VITE_ELEKTRIK_CHAT_API_URL ?? "").trim();

const starterMessage =
  "Beschreibe kurz das Problem, zum Beispiel: FI fliegt raus, einzelne Raeume ohne Strom oder verdaechtiger Geruch am Sicherungskasten. Ich helfe bei der ersten Einordnung und den naechsten sinnvollen Schritten.";

const promptSuggestions = [
  "Der FI-Schalter loest immer wieder aus. Woran kann das liegen?",
  "Nur Kueche und Flur sind ohne Strom. Was sollte ich zuerst pruefen?",
  "Eine Steckdose riecht verschmort. Was ist jetzt der sichere naechste Schritt?",
];

function createMessage(
  role: ChatRole,
  text: string,
  tone: ChatMessage["tone"] = "default",
): ChatMessage {
  return {
    id: `${role}-${crypto.randomUUID()}`,
    role,
    text,
    tone,
  };
}

function buildHistory(messages: ChatMessage[]): Array<[string, string]> {
  const history: Array<[string, string]> = [];
  let pendingUserMessage: string | null = null;

  for (const message of messages) {
    if (message.role === "user") {
      if (pendingUserMessage) {
        history.push([pendingUserMessage, ""]);
      }
      pendingUserMessage = message.text;
      continue;
    }

    if (pendingUserMessage) {
      history.push([pendingUserMessage, message.text]);
      pendingUserMessage = null;
    }
  }

  if (pendingUserMessage) {
    history.push([pendingUserMessage, ""]);
  }

  return history;
}

export function ElektrikEmergencyChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    createMessage("assistant", starterMessage),
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const logRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const log = logRef.current;
    if (!log) {
      return;
    }

    log.scrollTop = log.scrollHeight;
  }, [messages]);

  const isConfigured = apiUrl.length > 0;

  const submitMessage = async (rawMessage: string) => {
    const message = rawMessage.trim();

    if (!message || isSending) {
      return;
    }

    const history = buildHistory(messages);
    const userMessage = createMessage("user", message);

    setMessages((current) => [...current, userMessage]);
    setInput("");

    if (!isConfigured) {
      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          "Der Chat ist eingebaut, aber noch nicht mit einem API-Endpunkt verbunden. Hinterlege `VITE_ELEKTRIK_CHAT_API_URL`, damit Anfragen an deinen sicheren Anthropic-Proxy gehen.",
          "error",
        ),
      ]);
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, history }),
      });

      const contentType = response.headers.get("content-type") ?? "";
      const raw = await response.text();

      if (!contentType.includes("application/json")) {
        throw new Error(`Server lieferte kein JSON (Status ${response.status}).`);
      }

      let data: ChatResponse;

      try {
        data = JSON.parse(raw) as ChatResponse;
      } catch {
        throw new Error("Ungueltige JSON-Antwort vom Server.");
      }

      if (!response.ok) {
        throw new Error(data.error || "Unbekannter Fehler");
      }

      const reply = String(data.reply ?? "").trim() || "Keine Antwort erhalten.";
      setMessages((current) => [...current, createMessage("assistant", reply)]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unbekannter Fehler";

      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          `Die Anfrage konnte nicht verarbeitet werden: ${errorMessage}`,
          "error",
        ),
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="chat" className="elektrik-section elektrik-section--chat">
      <div className="site-shell elektrik-chat">
        <div className="elektrik-chat__copy">
          <p className="section-eyebrow">Notfall-Chat</p>
          <h2>Erste Einschaetzung direkt auf der Seite.</h2>
          <p>
            Nutzer koennen den Defekt kurz schildern und sofort eine erste
            Orientierung bekommen: Was ist wahrscheinlich, was sollte jetzt
            geprueft werden und wann ist ein sofortiger Einsatz sinnvoll.
          </p>
          <p>
            Der Chat ersetzt keinen Elektriker vor Ort. Bei Funken, Rauch,
            Brandgeruch oder Gefahr fuer Personen gilt: Strom nur sicher trennen
            und im Zweifel sofort 112 oder den Notdienst anrufen.
          </p>

          <div className="elektrik-chat__points">
            <article className="elektrik-chat__point">
              <strong>Schnelle Einordnung</strong>
              <p>FI, Sicherung, Steckdose oder kompletter Stromausfall.</p>
            </article>
            <article className="elektrik-chat__point">
              <strong>Klare naechste Schritte</strong>
              <p>Pruefpunkte, die ein Nutzer gefahrlos selbst abgleichen kann.</p>
            </article>
            <article className="elektrik-chat__point">
              <strong>Direkter Uebergang zum Einsatz</strong>
              <p>Wenn noetig, fuehrt die Seite weiter zum Anruf beim Notdienst.</p>
            </article>
          </div>
        </div>

        <article className="elektrik-chat-shell" aria-label="Elektriker Notfall Chat">
          <div className="elektrik-chat-shell__head">
            <div>
              <p className="section-eyebrow">Live-Beratung</p>
              <h3>Elektriker-Notfallchat</h3>
            </div>
            <span
              className={`elektrik-chat-status ${isConfigured ? "elektrik-chat-status--ready" : "elektrik-chat-status--offline"}`}
            >
              {isConfigured ? "API verbunden" : "API fehlt"}
            </span>
          </div>

          <div className="elektrik-chat-suggestions" aria-label="Beispielfragen">
            {promptSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="elektrik-chat-suggestion"
                onClick={() => setInput(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div
            ref={logRef}
            className="elektrik-chat-log"
            aria-live="polite"
            aria-atomic="false"
          >
            {messages.map((message) => (
              <article
                key={message.id}
                className={`elektrik-chat-message elektrik-chat-message--${message.role} ${message.tone === "error" ? "elektrik-chat-message--error" : ""}`}
              >
                <span className="elektrik-chat-message__meta">
                  {message.role === "user" ? "Du" : "Notfall-Assistenz"}
                </span>
                <p>{message.text}</p>
              </article>
            ))}
          </div>

          <form
            className="elektrik-chat-form"
            onSubmit={async (event) => {
              event.preventDefault();
              await submitMessage(input);
            }}
          >
            <label className="sr-only" htmlFor="elektrik-chat-input">
              Nachricht an den Elektriker-Chat
            </label>
            <textarea
              id="elektrik-chat-input"
              className="elektrik-chat-input"
              rows={4}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={async (event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  await submitMessage(input);
                }
              }}
              placeholder="Zum Beispiel: Der Sicherungskasten summt und zwei Raeume sind ohne Strom."
            />

            <div className="elektrik-chat-form__footer">
              <p className="elektrik-chat-form__hint">
                Der API-Key gehoert nicht ins Frontend. Diese Oberflaeche sendet
                nur an deinen konfigurierten Backend-Endpunkt.
              </p>
              <button
                type="submit"
                className="elektrik-button elektrik-button--primary"
                disabled={isSending}
              >
                {isSending ? "Wird gesendet..." : "Nachricht senden"}
              </button>
            </div>
          </form>
        </article>
      </div>
    </section>
  );
}
