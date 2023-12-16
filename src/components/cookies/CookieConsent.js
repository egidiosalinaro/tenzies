import { useCookies } from "react-cookie";
import { CookiesModal } from "./cookieConsentStyle";

export default function CookieConsent() {
  const [cookies, setCookies] = useCookies(["cookieConsent"]);

  const giveCookieConsent = () => {
    setCookies("cookieConsent", true, { path: "/" });
  };

  return (
    <CookiesModal>
      <p>
        We use cookies to enhance user experience. By using our website, you
        agree to our use of cookies.{" "}
        <a
          href="https://www.iubenda.com/privacy-policy/97839496/cookie-policy"
          title="Cookie Policy "
        >
          Learn more
        </a>
        . <br />
        Check out our{" "}
        <a
          href="https://www.iubenda.com/privacy-policy/97839496"
          title="Cookie Policy "
        >
          Privacy Policy
        </a>
        .
      </p>
      <button onClick={giveCookieConsent}>Accept</button>
    </CookiesModal>
  );
}
