import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Monitor,
  Film,
  Play,
  Pause,
  X,
  CalendarDays,
} from "lucide-react";
export default function LiveShowcase() {
  const bookingTrigger = useRef<HTMLButtonElement>(null);
  const closeBookingButton = useRef<HTMLButtonElement>(null);
  function closeBooking() {
    setBooking(false);
    requestAnimationFrame(() => bookingTrigger.current?.focus());
  }
  const [mode, setMode] = useState<"website" | "video">("website");
  const [booking, setBooking] = useState(false);
  const [slot, setSlot] = useState("10:00");
  const [confirmed, setConfirmed] = useState(false);
  const [menu, setMenu] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [edited, setEdited] = useState(true);
  useEffect(() => {
    if (booking && mode === "website") closeBookingButton.current?.focus();
  }, [booking, mode]);
  useEffect(() => {
    if (!playing || mode !== "video") return;
    const timer = window.setInterval(
      () =>
        setProgress((p) => {
          if (p >= 100) {
            setPlaying(false);
            return 100;
          }
          return p + 2;
        }),
      200,
    );
    return () => clearInterval(timer);
  }, [playing, mode]);
  return (
    <div className="live-showcase">
      <div className="showcase-top">
        <div
          className="showcase-tabs"
          role="group"
          aria-label="Choose a live example"
        >
          <button
            aria-pressed={mode === "website"}
            onClick={() => {
              setMode("website");
              setPlaying(false);
            }}
          >
            <Monitor size={15} /> A website
          </button>
          <button
            aria-pressed={mode === "video"}
            onClick={() => setMode("video")}
          >
            <Film size={15} /> A video edit
          </button>
        </div>
        <span className="showcase-live">
          <i /> TRY IT LIVE
        </span>
      </div>
      {mode === "website" ? (
        <div className="cafe-preview">
          <div className="cafe-nav" inert={booking}>
            <strong>
              still<span>coffee & company</span>
            </strong>
            <button onClick={() => setMenu(!menu)}>
              {menu ? "Back to café" : "The menu"} <ArrowUpRight size={12} />
            </button>
          </div>
          <div className="cafe-photo">
            <img
              src="/images/coffee.jpg"
              alt="Friends sharing three freshly made coffees"
              width="1200"
              height="800"
              fetchPriority="high"
            />
            <div className="cafe-photo-copy">
              <span>YOUR DAILY MOMENT OF GOOD.</span>
              <h2>
                Good coffee.
                <br />
                Better company.
              </h2>
            </div>
          </div>
          {menu ? (
            <div className="cafe-menu" aria-live="polite">
              <span>THE SAMPLE MENU</span>
              <div>
                <b>01 / Slow mornings</b>
                <p>Espresso · Flat white · Filter coffee</p>
              </div>
              <div>
                <b>02 / Something sweet</b>
                <p>Fresh pastries · Seasonal cake</p>
              </div>
            </div>
          ) : (
            <div className="cafe-bottom" inert={booking}>
              <p>
                A little pause.
                <br />A place to come together.
              </p>
              <button
                ref={bookingTrigger}
                onClick={() => {
                  setBooking(true);
                  setConfirmed(false);
                }}
              >
                Book a table <ArrowUpRight size={15} />
              </button>
            </div>
          )}
          {booking && (
            <div
              className="sample-booking"
              role="region"
              aria-label="Sample booking"
              onKeyDown={(e) => {
                if (e.key === "Escape") closeBooking();
              }}
            >
              <div>
                <CalendarDays size={20} />
                <button
                  aria-label="Close sample booking"
                  ref={closeBookingButton}
                  onClick={closeBooking}
                >
                  <X size={19} />
                </button>
              </div>
              <h3>Your next coffee break.</h3>
              <p>Choose a sample time for two.</p>
              <div className="sample-times">
                {["10:00", "12:30", "15:00"].map((time) => (
                  <button
                    aria-pressed={slot === time}
                    key={time}
                    onClick={() => {
                      setSlot(time);
                      setConfirmed(false);
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <button
                className="sample-confirm"
                onClick={() => setConfirmed(true)}
              >
                {confirmed ? (
                  <>
                    <Check size={16} /> Preview confirmed
                  </>
                ) : (
                  <>
                    Try the booking <ArrowUpRight size={16} />
                  </>
                )}
              </button>
              <small role="status">
                {confirmed
                  ? `Sample table for two at ${slot}. No real booking made.`
                  : "Interactive example. No real booking is made."}
              </small>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`hero-video ${edited ? "edited" : "raw"} ${playing ? "playing" : ""}`}
        >
          <div className="video-photo">
            <img
              src="/images/mountain.jpg"
              alt="Sunlight across a wide mountain valley"
              width="1400"
              height="933"
            />
            <span className="video-kind">
              {edited ? "EDITED CONCEPT" : "SOURCE PHOTO"}
            </span>
            {edited && (
              <div className="video-headline" key={Math.floor(progress / 35)}>
                <small>A PHOTO-TO-MOTION STUDY</small>
                <h2>
                  {progress < 35
                    ? "Go somewhere."
                    : progress < 70
                      ? "Feel something."
                      : "Make it matter."}
                </h2>
                <span>OUTSIDE THE ORDINARY ↗</span>
              </div>
            )}
            <button
              className="video-play"
              aria-label={
                playing ? "Pause motion preview" : "Play motion preview"
              }
              onClick={() => {
                if (progress >= 100) setProgress(0);
                setPlaying(!playing);
              }}
            >
              {playing ? (
                <Pause size={22} />
              ) : (
                <Play size={22} fill="currentColor" />
              )}
            </button>
          </div>
          <div className="video-edit-bar">
            <div
              className="edit-toggle"
              role="group"
              aria-label="Video treatment"
            >
              <button aria-pressed={!edited} onClick={() => setEdited(false)}>
                Original
              </button>
              <button aria-pressed={edited} onClick={() => setEdited(true)}>
                With edit
              </button>
            </div>
            <span>
              {String(Math.floor(progress / 10)).padStart(2, "0")} / 10 sec
            </span>
          </div>
          <div
            className="video-track"
            role="progressbar"
            aria-label="Motion preview progress"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <i style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
      <div className="showcase-caption">
        <span>
          {mode === "website"
            ? "A café website with a working booking preview."
            : "Original photo + typography + motion. Press play."}
        </span>
        <span>Concept demo</span>
      </div>
    </div>
  );
}
