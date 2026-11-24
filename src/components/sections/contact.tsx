import { CopyButton } from "@/components/ui/copy-button";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <section className="contact" id="contact" data-theme="dark">
      <div className="wrap">
        <h2>
          Vous cherchez un <em className="line">développeur&nbsp;?</em>
        </h2>
        <div className="mail">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <CopyButton text={profile.email} />
        </div>
        <div className="outbound">
          <a href={profile.linkedin}>
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a href={profile.github}>
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
        <footer>
          <span>{profile.name}, 2026</span>
          <span>{profile.city}</span>
        </footer>
      </div>
    </section>
  );
}
