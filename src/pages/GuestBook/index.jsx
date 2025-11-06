import GuestBookCard from './GuestBookCard';
import { guestbookMessages } from '../../data/guestbook';
import '../../styles/sub/guestbook.css';

export default function GuestBook() {
  return (
    <section className="page-container">
      <div className="page-inner">
        <div className="guestbook-titlebox">
          <h2 className="guestbook-title">고생한 학우들에게 응원의 한마디!</h2>
          <div className="guestbook-btn">
            <a href="">글 작성하기</a>
          </div>
        </div>

        <div className="guestbook-grid">
          {guestbookMessages.map((item, idx) => (
            <GuestBookCard
              key={idx}
              to={item.to}
              message={item.message}
              from={item.from}
            />
          ))}
        </div>

      </div>
    </section>
  );
}