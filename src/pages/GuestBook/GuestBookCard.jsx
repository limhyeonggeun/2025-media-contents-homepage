export default function GuestBookCard({ to, message, from }) {
  return (
    <div className="guestbook-card">
      <p className="guestbook-to">
        To <span className="guestbook-name">{to}</span>
      </p>

      <p className="guestbook-message">{message}</p>

      <p className="guestbook-from">
        From <span className="guestbook-name">{from}</span>
      </p>
    </div>
  );
}