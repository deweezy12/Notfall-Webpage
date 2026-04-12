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
  "Hallo! Falls du schnell Hilfe brauchst, koennen wir gerne gemeinsam schauen, ob wir spontan helfen koennen. Erklaere mir das Problem oder stelle mir eine Frage, ich helfe gern.";

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
        throw new Error("Ungültige JSON-Antwort vom Server.");
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
        <header className="elektrik-chat__header">
          <p className="section-eyebrow">Live Chat für die schnelle Hilfe</p>
          <h2>Live Chat für die schnelle Hilfe</h2>
        </header>

        <article className="elektrik-chat-shell" aria-label="Elektriker Notfall Chat">
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
              Nachricht an den Experten Chat
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
              placeholder="Zum Beispiel: Der Sicherungskasten summt und zwei Räume sind ohne Strom."
            />

            <div className="elektrik-chat-form__footer">
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
