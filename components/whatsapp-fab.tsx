import { WhatsApp } from "@/components/icons";
import { CONTACT } from "@/lib/site";

/** Always-visible WhatsApp call-to-action (bottom-right). */
export function WhatsAppFab() {
  return (
    <a
      href={CONTACT.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] py-3.5 pl-3.5 pr-4 text-white shadow-lg shadow-emerald-700/30 transition hover:scale-[1.03] hover:shadow-xl"
    >
      <WhatsApp className="h-6 w-6" />
      <span className="hidden text-sm font-semibold sm:inline">Chat with us</span>
    </a>
  );
}
