import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  ShoppingBag,
  Minus,
  Plus,
  CalendarDays,
  Play,
  Pause,
  RotateCcw,
  Monitor,
  Smartphone,
  Sparkles,
  MessageSquare,
  Mail,
  MousePointer2,
  ChevronRight,
  Scissors,
  Film,
  Layers,
  MapPin,
} from "lucide-react";
import "../studios.css";

function Switcher({
  items,
  value,
  onChange,
  label,
}: {
  items: string[];
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <div className="demo-switcher" role="group" aria-label={label}>
      {items.map((item) => (
        <button
          type="button"
          key={item}
          aria-pressed={item === value}
          className={item === value ? "is-active" : ""}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
function Shell({
  children,
  label = "Interactive concept · simulated content",
  identity,
}: {
  children: ReactNode;
  label?: string;
  identity: string;
}) {
  return (
    <div className={`service-demo study-${identity.toLowerCase()}`}>
      <div className="demo-caption">
        <span className="demo-status-dot" />
        {label}
        <span className="demo-live">
          TRY IT YOURSELF <MousePointer2 size={12} />
        </span>
      </div>
      {children}
    </div>
  );
}
function CityScene({
  edited = false,
  caption = "MAKE EVERY MOMENT MATTER.",
  style = "Bold",
  framing = "Full frame",
  beat = 0,
}: {
  edited?: boolean;
  caption?: string;
  style?: string;
  framing?: string;
  beat?: number;
}) {
  return (
    <div
      className={`city-scene ${edited ? "scene-edited" : "scene-raw"} framing-${framing === "Close-up" ? "close" : "full"}`}
      data-beat={beat}
    >
      <div className="scene-orbit" />
      <div className="scene-architecture">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="scene-road" />
      <div className="scene-figure" />
      <span className="scene-timestamp">
        {edited ? "01 / THE CITY IS YOURS" : "CAM A — 00:14:28"}
      </span>
      {edited && (
        <strong
          key={`${caption}-${style}`}
          className={`scene-caption caption-${style.toLowerCase()}`}
        >
          {caption}
        </strong>
      )}
      <span className="scene-bottom">
        {edited
          ? "A MAKENDLESS VISUAL CONCEPT"
          : "ORIGINAL ILLUSTRATION · UNEDITED STATE"}
      </span>
    </div>
  );
}
function ShortForm() {
  const [split, setSplit] = useState(55);
  const [caption, setCaption] = useState("Bold");
  const [framing, setFraming] = useState("Full frame");
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const beat = progress < 34 ? 0 : progress < 67 ? 1 : 2;
  const captions = [
    "MAKE EVERY MOMENT MATTER.",
    "FIND YOUR OWN RHYTHM.",
    "MAKE YOUR NEXT MOVE.",
  ];
  useEffect(() => {
    if (!playing) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => setPlaying(false);
    const visibility = () => {
      if (document.hidden) stop();
    };
    const motionChange = () => {
      if (media.matches) stop();
    };
    let timer: ReturnType<typeof setInterval> | undefined;
    if (!media.matches && !document.hidden) {
      timer = setInterval(() => setProgress((p) => Math.min(100, p + 2)), 100);
    }
    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) stop();
          })
        : null;
    if (stage.current) observer?.observe(stage.current);
    document.addEventListener("visibilitychange", visibility);
    media.addEventListener("change", motionChange);
    return () => {
      clearInterval(timer);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      media.removeEventListener("change", motionChange);
    };
  }, [playing]);
  useEffect(() => {
    if (progress === 100) setPlaying(false);
  }, [progress]);
  return (
    <Shell identity="V1">
      <div className="demo-visual shortform-stage" ref={stage}>
        <div className="comparison-scene">
          <CityScene framing={framing} beat={beat} />
          <div
            className="comparison-overlay"
            style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
          >
            <CityScene
              edited
              style={caption}
              framing={framing}
              beat={beat}
              caption={captions[beat]}
            />
          </div>
          <div className="comparison-line" style={{ left: `${split}%` }}>
            <span>↔</span>
          </div>
          <div className="comparison-labels">
            <span>EDITED</span>
            <span>RAW</span>
          </div>
        </div>
        <div className="shortform-copy">
          <span className="demo-kicker">
            THE SAME MOMENT.
            <br />A DIFFERENT FEELING.
          </span>
          <h3>
            Make them
            <br />
            <em>stop scrolling.</em>
          </h3>
          <p>
            Explore caption treatment, framing and visual rhythm in this
            original illustrative concept.
          </p>
          <div className="demo-readout">
            <Scissors size={16} />
            <span>9:16 social edit</span>
          </div>
          <div
            className="edit-beat-track"
            aria-label="Illustrative edit frames"
          >
            {["Opening", "Rhythm", "Close"].map((name, i) => (
              <button
                key={name}
                aria-pressed={beat === i}
                onClick={() => {
                  setPlaying(false);
                  setProgress(i * 34);
                }}
              >
                <span>0{i + 1}</span>
                {name}
              </button>
            ))}
          </div>
          <div className="edit-progress" aria-hidden="true">
            <i style={{ transform: `scaleX(${progress / 100})` }} />
          </div>
          <button
            className="demo-small-button edit-preview-button"
            onClick={() => {
              if (
                window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ) {
                setPlaying(false);
                setProgress(((beat + 1) % 3) * 34);
              } else {
                if (progress === 100) setProgress(0);
                setPlaying((p) => !p);
              }
            }}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
            {playing ? "Pause edit" : "Preview edit"}
          </button>
          <small className="edit-preview-note">
            Original animated illustration. Reduced motion steps through still
            frames.
          </small>
        </div>
      </div>
      <div className="demo-controls">
        <label className="range-field">
          Before / after comparison{" "}
          <input
            aria-label="Before and after comparison"
            type="range"
            min="0"
            max="100"
            value={split}
            onChange={(e) => setSplit(+e.target.value)}
          />
        </label>
        <Switcher
          label="Preview state"
          items={["Raw", "Compare", "Edited"]}
          value={split === 0 ? "Raw" : split === 100 ? "Edited" : "Compare"}
          onChange={(v) =>
            setSplit(v === "Raw" ? 0 : v === "Edited" ? 100 : 55)
          }
        />
        <div className="demo-control-row">
          <span>Captions</span>
          <Switcher
            label="Caption style"
            items={["Bold", "Minimal", "Highlight"]}
            value={caption}
            onChange={setCaption}
          />
        </div>
        <div className="demo-control-row">
          <span>Framing</span>
          <Switcher
            label="Framing"
            items={["Full frame", "Close-up"]}
            value={framing}
            onChange={setFraming}
          />
        </div>
      </div>
    </Shell>
  );
}
const highlights = [
  {
    time: "00:00",
    title: "The opening idea",
    text: "Every great story starts with a different perspective.",
    length: "0:24",
  },
  {
    time: "12:40",
    title: "The turning point",
    text: "We stopped asking what was possible. We started making it.",
    length: "0:38",
  },
  {
    time: "28:15",
    title: "The takeaway",
    text: "Make something that matters. Then keep going.",
    length: "0:31",
  },
];
function Podcast() {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<number[]>([0, 2]);
  return (
    <Shell identity="V2">
      <div className="demo-visual podcast-stage">
        <span className="demo-kicker">THE STUDIO CONVERSATIONS</span>
        <div className="podcast-portrait" key={active} data-motion="mask">
          <div className="portrait-disc">m.</div>
          <div>
            <span>SELECTED HIGHLIGHT {active + 1}</span>
            <h3>{highlights[active].title}</h3>
            <p>“{highlights[active].text}”</p>
          </div>
        </div>
        <div className="waveform" aria-hidden="true">
          <span
            className="podcast-playhead"
            style={{ left: `${((active * 21 + 10) / 65) * 100}%` }}
          />
          {Array.from({ length: 65 }, (_, i) => (
            <i
              key={i}
              style={{
                height: `${18 + Math.abs(Math.sin(i * 1.7)) * 52}px`,
                opacity: i >= active * 21 && i < (active + 1) * 21 ? 1 : 0.25,
              }}
            />
          ))}
        </div>
        <div className="podcast-package" aria-label="Selected output clips">
          {selected.map((i) => (
            <span key={i}>
              {highlights[i].length}
              <small>{highlights[i].title}</small>
            </span>
          ))}
        </div>
        <div className="timeline-labels">
          <span>00:00</span>
          <span>FULL RECORDING / 40:00</span>
          <span>40:00</span>
        </div>
      </div>
      <div className="demo-controls">
        <span className="demo-kicker">EXPLORE THE EDIT</span>
        <div className="highlight-grid">
          {highlights.map((h, i) => (
            <div
              className={`highlight-item ${active === i ? "selected" : ""}`}
              key={h.time}
            >
              <button onClick={() => setActive(i)} aria-pressed={active === i}>
                <Play size={14} />
                <span>
                  {h.time} · {h.title}
                </span>
                <b>{h.length}</b>
              </button>
              <label>
                <input
                  type="checkbox"
                  checked={selected.includes(i)}
                  onChange={() =>
                    setSelected((p) =>
                      p.includes(i) ? p.filter((x) => x !== i) : [...p, i],
                    )
                  }
                />{" "}
                Include in highlight package
              </label>
            </div>
          ))}
        </div>
        <p className="demo-feedback" role="status">
          {selected.length} highlight{selected.length === 1 ? "" : "s"} selected
          ·{" "}
          {selected.length
            ? selected.map((i) => highlights[i].title).join(" / ")
            : "Select a highlight to build your package."}
        </p>
      </div>
    </Shell>
  );
}
function ProductArt({ variant = "clear" }: { variant?: string }) {
  return (
    <div className={`product-art product-${variant}`} aria-hidden="true">
      <div className="product-halo" />
      <div className="product-bottle">
        <div className="bottle-cap" />
        <span>
          FORM
          <br />
          <small>DAILY RITUAL</small>
        </span>
      </div>
      <div className="product-plinth" />
    </div>
  );
}
function Promo() {
  const [style, setStyle] = useState("Cinematic");
  return (
    <Shell identity="V3">
      <div
        className={`demo-visual promo-stage promo-${style.toLowerCase().replaceAll(" ", "-")}`}
      >
        <div className="promo-wordmark">FORM / 01</div>
        <ProductArt />
        <div className="promo-copy" key={style} data-motion="typography">
          <span className="demo-kicker">
            {style === "Cinematic"
              ? "LESS, BUT BETTER."
              : style === "Product-focused"
                ? "MEET YOUR DAILY RITUAL."
                : "MAKE SPACE FOR YOU."}
          </span>
          <h3>
            {style === "Cinematic" ? (
              "An everyday\nessential."
            ) : style === "Product-focused" ? (
              "Thoughtfully\nmade."
            ) : (
              <>
                A little
                <br />
                reset.
              </>
            )}
          </h3>
          <span className="promo-cta">
            {style === "Cinematic"
              ? "Discover the collection"
              : style === "Product-focused"
                ? "Explore the details"
                : "Find your form"}{" "}
            <ArrowRight size={14} />
          </span>
        </div>
        <span className="promo-label">FICTIONAL PRODUCT · ILLUSTRATIVE AD</span>
      </div>
      <div className="demo-controls">
        <div className="demo-control-row">
          <span>Creative direction</span>
          <Switcher
            label="Advertisement style"
            items={["Cinematic", "Product-focused", "Fast-paced social"]}
            value={style}
            onChange={setStyle}
          />
        </div>
        <p className="demo-feedback">
          {style === "Cinematic"
            ? "Atmospheric composition. Quiet typography. Space to feel the story."
            : style === "Product-focused"
              ? "Product-first framing. A clear message. Details that matter."
              : "Bold cropping. Energetic type. Built for a small screen."}
        </p>
      </div>
    </Shell>
  );
}
function Repurpose() {
  const [format, setFormat] = useState("Reel");
  const formats: {
    [key: string]: { ratio: string; duration: string; copy: string };
  } = {
    Reel: {
      ratio: "9 / 16",
      duration: "0:30",
      copy: "ONE IDEA. ENDLESS POSSIBILITIES.",
    },
    Short: {
      ratio: "9 / 16",
      duration: "0:45",
      copy: "HERE’S THE MOMENT THAT CHANGED EVERYTHING.",
    },
    Teaser: {
      ratio: "16 / 9",
      duration: "0:15",
      copy: "SOMETHING GOOD IS COMING.",
    },
    "Social cutdown": {
      ratio: "1 / 1",
      duration: "0:20",
      copy: "THE BEST PART, RIGHT HERE.",
    },
  };
  return (
    <Shell identity="V4">
      <div className="demo-visual repurpose-stage">
        <div className="source-recording">
          <Film size={28} />
          <span>ONE SOURCE</span>
          <strong>The full story.</strong>
          <small>40-minute concept recording</small>
          <div className="source-lines">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="repurpose-branch" aria-hidden="true">
          <span>RESHAPE THE STORY</span>
          <svg viewBox="0 0 100 160" preserveAspectRatio="none">
            <path d="M0 80H35 M35 80V20H100 M35 80V60H100 M35 80V100H100 M35 80V140H100" />
          </svg>
          <div className="format-family">
            {Object.keys(formats).map((name, i) => (
              <i key={name} className={name === format ? "active" : ""}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                {name}
              </i>
            ))}
          </div>
        </div>
        <div
          className="repurpose-output"
          key={format}
          data-format={format}
          style={{ aspectRatio: formats[format].ratio }}
        >
          <CityScene edited caption={formats[format].copy} />
          <span className="output-duration">
            {format} · {formats[format].duration}
          </span>
        </div>
      </div>
      <div className="demo-controls">
        <div className="demo-control-row">
          <span>Choose an output</span>
          <Switcher
            label="Output format"
            items={Object.keys(formats)}
            value={format}
            onChange={setFormat}
          />
        </div>
        <p className="demo-feedback" role="status">
          {format}: {formats[format].ratio.replace(" / ", ":")} format ·{" "}
          {formats[format].duration} concept edit. Framing and message adapt to
          the destination.
        </p>
      </div>
    </Shell>
  );
}
function Motion() {
  const [type, setType] = useState("Rise");
  const [graphic, setGraphic] = useState("Lines");
  const [headline, setHeadline] = useState("MAKE IT MOVE.");
  const [tempo, setTempo] = useState("Deliberate");
  const [play, setPlay] = useState(0);
  const words = (headline.trim() || "MAKE IT MOVE.").split(/\s+/);
  const compositionKey = `${type}-${graphic}-${tempo}-${play}`;
  return (
    <Shell identity="V5">
      <div
        className={`demo-visual motion-stage graphic-${graphic.toLowerCase()}`}
        style={
          {
            "--type-duration": tempo === "Deliberate" ? "950ms" : "480ms",
          } as CSSProperties
        }
      >
        <div
          className="motion-graphic"
          aria-hidden="true"
          key={`graphic-${compositionKey}`}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <i key={i} style={{ "--i": i } as CSSProperties} />
          ))}
        </div>
        <span className="demo-kicker">THE TYPE LAB / MAKE SOMETHING MOVE</span>
        <div className="motion-registration" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <h3
          key={`type-${compositionKey}`}
          className={`motion-type type-${type.toLowerCase()}`}
          aria-label={headline.trim() || "MAKE IT MOVE."}
        >
          {words.map((word, i) => (
            <span
              className="motion-word-mask"
              key={`${i}-${word}`}
              aria-hidden="true"
            >
              <span
                className="motion-word"
                style={{ "--word-index": i } as CSSProperties}
              >
                {word}
              </span>
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h3>
        <div className="motion-footnote">
          <span>ORIGINAL TYPE STUDY / {type.toUpperCase()}</span>
          <span>
            {tempo === "Deliberate" ? "SLOW & CONSIDERED" : "SHORT & PRECISE"}
          </span>
        </div>
      </div>
      <div className="demo-controls">
        <label className="motion-headline-input">
          Your motion headline
          <input
            value={headline}
            maxLength={42}
            onChange={(e) => setHeadline(e.target.value)}
          />
        </label>
        <div className="demo-control-row">
          <span>Type treatment</span>
          <Switcher
            label="Typography motion"
            items={["Rise", "Reveal", "Scale"]}
            value={type}
            onChange={setType}
          />
        </div>
        <div className="demo-control-row">
          <span>Graphic language</span>
          <Switcher
            label="Graphic style"
            items={["Lines", "Orbits", "Tiles"]}
            value={graphic}
            onChange={setGraphic}
          />
        </div>
        <div className="demo-control-row">
          <span>Timing</span>
          <Switcher
            label="Motion timing"
            items={["Deliberate", "Snappy"]}
            value={tempo}
            onChange={setTempo}
          />
          <button
            className="demo-small-button"
            onClick={() => setPlay((p) => p + 1)}
          >
            <RotateCcw size={14} /> Replay
          </button>
        </div>
        <p className="demo-feedback">
          Human-directed motion study. This demo uses CSS animation; no AI
          generation is being performed.
        </p>
      </div>
    </Shell>
  );
}
function MiniWebsite({
  wireframe = false,
  mobile = false,
  optimized = true,
  interactive = false,
}: {
  wireframe?: boolean;
  mobile?: boolean;
  optimized?: boolean;
  interactive?: boolean;
}) {
  const [collection, setCollection] = useState(false);
  return (
    <div
      className={`mini-site ${wireframe ? "is-wireframe" : ""} ${mobile ? "is-mobile" : ""} ${optimized ? "is-optimized" : "is-unoptimized"}`}
    >
      <div className="mini-browser">
        <i />
        <i />
        <i />
        <span>studio-concept.local</span>
      </div>
      <div className="mini-nav">
        <strong>STILL / STUDIO</strong>
        {interactive && !wireframe ? (
          <div role="group" aria-label="Sample website pages">
            <button
              aria-pressed={!collection}
              onClick={() => setCollection(false)}
            >
              Home
            </button>
            <button
              aria-pressed={collection}
              onClick={() => setCollection(true)}
            >
              Collection
            </button>
          </div>
        ) : (
          <span>About &nbsp; Collection</span>
        )}
      </div>
      {collection && !wireframe ? (
        <div className="mini-collection">
          <small>OBJECTS FOR EVERY DAY / FICTIONAL COLLECTION</small>
          <h3>A little less. A little better.</h3>
          <div className="mini-collection-objects">
            {["The daily vessel", "The quiet hour", "The Sunday ritual"].map(
              (name, i) => (
                <div key={name}>
                  <div
                    className={`collection-object object-${i}`}
                    aria-hidden="true"
                  />
                  <strong>{name}</strong>
                  <span>Concept object / 0{i + 1}</span>
                </div>
              ),
            )}
          </div>
          <button
            className="mini-site-cta"
            onClick={() => setCollection(false)}
          >
            <ArrowLeft size={12} /> Back to sample homepage
          </button>
        </div>
      ) : (
        <div className="mini-site-hero">
          <div>
            <small>SPACE TO FEEL GOOD.</small>
            <h3>
              Find your
              <br />
              <em>quiet moment.</em>
            </h3>
            <p>Considered objects. Everyday rituals. A little room for you.</p>
            {interactive && !wireframe ? (
              <button
                className="mini-site-cta"
                onClick={() => setCollection(true)}
                aria-label="Open sample collection"
              >
                Explore the collection <ArrowRight size={12} />
              </button>
            ) : (
              <span className="mini-site-cta">
                Explore the collection <ArrowRight size={12} />
              </span>
            )}
          </div>
          <div className="mini-site-art">
            <div className="art-arch" />
            <div className="art-vase" />
            <div className="art-floor" />
          </div>
        </div>
      )}
      <div className="mini-site-footer">
        <span>THOUGHTFULLY MADE</span>
        <span>DESIGNED FOR EVERY DAY</span>
        <span>YOUR NEXT CHAPTER</span>
      </div>
    </div>
  );
}
function Website() {
  const [state, setState] = useState("Finished");
  const [device, setDevice] = useState("Desktop");
  return (
    <Shell identity="T1">
      <div className="demo-visual website-stage">
        <div className="website-construction-note" aria-hidden="true">
          <span>
            {state === "Wireframe"
              ? "01 / THE STRUCTURE"
              : "02 / THE EXPERIENCE"}
          </span>
          <i />
          <span>{device.toUpperCase()}</span>
        </div>
        <MiniWebsite
          key={state}
          wireframe={state === "Wireframe"}
          mobile={device === "Mobile"}
          interactive
        />
      </div>
      <div className="demo-controls">
        <div className="demo-control-row">
          <span>From structure to character</span>
          <Switcher
            label="Website design state"
            items={["Wireframe", "Finished"]}
            value={state}
            onChange={setState}
          />
        </div>
        <div className="demo-control-row">
          <span>Responsive preview</span>
          <div
            className="demo-switcher"
            role="group"
            aria-label="Website device"
          >
            <button
              className={device === "Desktop" ? "is-active" : ""}
              aria-pressed={device === "Desktop"}
              onClick={() => setDevice("Desktop")}
            >
              <Monitor size={15} /> Desktop
            </button>
            <button
              className={device === "Mobile" ? "is-active" : ""}
              aria-pressed={device === "Mobile"}
              onClick={() => setDevice("Mobile")}
            >
              <Smartphone size={15} /> Mobile
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}
const products = [
  { name: "The everyday vessel", price: 28, variant: "clear" },
  { name: "The evening ritual", price: 36, variant: "violet" },
  { name: "The morning reset", price: 24, variant: "aqua" },
];
function Store() {
  const [selected, setSelected] = useState(0);
  const [cart, setCart] = useState([0, 0, 0]);
  const [checkout, setCheckout] = useState(false);
  const [added, setAdded] = useState("");
  const total = cart.reduce((a, q, i) => a + q * products[i].price, 0);
  const count = cart.reduce((a, q) => a + q, 0);
  function change(i: number, delta: number) {
    setCart((p) =>
      p.map((q, index) =>
        index === i ? Math.max(0, Math.min(9, q + delta)) : q,
      ),
    );
    setCheckout(false);
  }
  return (
    <Shell
      identity="T2"
      label="Interactive storefront · fictional products · no real payments"
    >
      <div className="store-head">
        <strong>FORM / OBJECTS</strong>
        <span key={count} className="cart-count">
          <ShoppingBag size={17} /> {count}
        </span>
      </div>
      <div className="demo-visual store-stage">
        <div className="store-product">
          <ProductArt key={selected} variant={products[selected].variant} />
          <div>
            <span className="demo-kicker">THE EVERYDAY COLLECTION</span>
            <h3>{products[selected].name}</h3>
            <p>Illustrative product · ${products[selected].price}.00</p>
            <button
              className="demo-primary-button"
              disabled={cart[selected] >= 9}
              onClick={() => {
                change(selected, 1);
                setAdded(`${products[selected].name} added to demo cart`);
              }}
            >
              <Plus size={15} /> Add to demo cart
            </button>
          </div>
        </div>
        <div
          className="product-picker"
          role="group"
          aria-label="Browse sample products"
        >
          {products.map((p, i) => (
            <button
              key={p.name}
              aria-pressed={i === selected}
              className={i === selected ? "selected" : ""}
              onClick={() => {
                setSelected(i);
                setAdded("");
              }}
            >
              <span className={`product-swatch swatch-${p.variant}`} />
              {p.name}
            </button>
          ))}
        </div>
      </div>
      <div className="demo-controls">
        <span className="sr-only" role="status">
          {added}
        </span>
        {count > 0 ? (
          <>
            <div className="cart-items">
              {cart.map(
                (q, i) =>
                  q > 0 && (
                    <div className="cart-row" key={products[i].name}>
                      <span>{products[i].name}</span>
                      <div>
                        <button
                          aria-label={`Remove one ${products[i].name}`}
                          onClick={() => change(i, -1)}
                        >
                          <Minus size={13} />
                        </button>
                        <output aria-label={`Quantity of ${products[i].name}`}>
                          {q}
                        </output>
                        <button
                          aria-label={`Add one ${products[i].name}`}
                          disabled={q >= 9}
                          onClick={() => change(i, 1)}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <strong>${q * products[i].price}</strong>
                    </div>
                  ),
              )}
            </div>
            <div className="demo-control-row">
              <strong>Demo total: ${total}.00</strong>
              <button
                className="demo-small-button"
                onClick={() => setCheckout(true)}
              >
                Preview checkout <ArrowRight size={14} />
              </button>
            </div>
          </>
        ) : (
          <p className="demo-feedback">
            Your demo cart is empty. Pick an object to try the shopping
            experience.
          </p>
        )}
        {checkout && (
          <div className="demo-confirmation" role="status">
            <CheckCircle2 />
            <div>
              <strong>Mock checkout ready</strong>
              <p>
                {count} item{count === 1 ? "" : "s"} · ${total}.00. This is a
                demonstration. No order or payment has been created.
              </p>
            </div>
          </div>
        )}
      </div>
    </Shell>
  );
}
function getDates() {
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
      day: d.toLocaleDateString("en", { weekday: "short" }),
      date: d.getDate(),
      full: d.toLocaleDateString("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
  });
}
function Booking() {
  const dates = getDates();
  const [date, setDate] = useState(dates[0].value);
  const [time, setTime] = useState("");
  const [service, setService] = useState("Creative consultation");
  const [confirmed, setConfirmed] = useState(false);
  const slots = ["09:00", "10:30", "13:00", "14:30", "16:00"];
  const dateIndex = dates.findIndex((d) => d.value === date);
  return (
    <Shell
      identity="T3"
      label="Booking demonstration · no real appointment is created"
    >
      <div className="demo-visual booking-stage">
        <div className="booking-intro">
          <CalendarDays size={27} />
          <span className="demo-kicker">A LITTLE TIME. A NEW POSSIBILITY.</span>
          <h3>
            Make room
            <br />
            for your next idea.
          </h3>
          <p>
            Choose a service, a date and a time. See how an effortless booking
            experience comes together.
          </p>
        </div>
        <div className="booking-widget">
          <ol className="booking-progress" aria-label="Booking progress">
            {["Choose", "Select time", "Preview"].map((label, i) => (
              <li
                key={label}
                aria-current={
                  i === (confirmed ? 2 : time ? 1 : 0) ? "step" : undefined
                }
              >
                <span>0{i + 1}</span>
                {label}
              </li>
            ))}
          </ol>
          <label>
            Sample service
            <select
              value={service}
              onChange={(e) => {
                setService(e.target.value);
                setConfirmed(false);
              }}
            >
              <option>Creative consultation</option>
              <option>Website planning</option>
              <option>Automation discovery</option>
            </select>
          </label>
          <span className="booking-label">Choose a date</span>
          <div className="booking-dates">
            {dates.map((d) => (
              <button
                key={d.value}
                aria-label={d.full}
                aria-pressed={date === d.value}
                className={date === d.value ? "selected" : ""}
                onClick={() => {
                  setDate(d.value);
                  setTime("");
                  setConfirmed(false);
                }}
              >
                <span>{d.day}</span>
                <strong>{d.date}</strong>
              </button>
            ))}
          </div>
          <span className="booking-label">
            Available sample times · your local time
          </span>
          <div className="booking-times" key={date}>
            {slots.map((s, i) => (
              <button
                key={s}
                disabled={i === (dateIndex + 1) % 5}
                aria-pressed={time === s}
                className={time === s ? "selected" : ""}
                onClick={() => {
                  setTime(s);
                  setConfirmed(false);
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            className="demo-primary-button"
            disabled={!time}
            onClick={() => setConfirmed(true)}
          >
            Preview booking <ArrowRight size={14} />
          </button>
        </div>
      </div>
      {confirmed && (
        <div className="demo-confirmation" role="status">
          <CheckCircle2 />
          <div>
            <strong>Simulated booking confirmed</strong>
            <p>
              {service} · {dates.find((d) => d.value === date)?.full} · {time}.
              No appointment has been booked.
            </p>
          </div>
        </div>
      )}
    </Shell>
  );
}
const workflowSteps = [
  "Customer inquiry",
  "Classification",
  "Routing",
  "Draft response",
  "Human review",
];
function Automation() {
  const [step, setStep] = useState(0);
  const [inquiry, setInquiry] = useState("Website project");
  const route =
    inquiry === "Website project"
      ? "BUILD studio"
      : inquiry === "Video editing"
        ? "CREATE studio"
        : "GROW interest list";
  const content = [
    `“Hello, I’d like to discuss ${inquiry.toLowerCase()} for my business.”`,
    `Intent detected: ${inquiry}. Priority: standard inquiry.`,
    `Suggested destination: ${route}. A human can change this routing.`,
    `“Thanks for reaching out. We’d love to understand your ${inquiry.toLowerCase()} goals. Could you share a little more about your project?”`,
    "A team member reviews the draft, checks the details and chooses whether to send. Nothing is sent by this demo.",
  ];
  return (
    <Shell
      identity="T4"
      label="Rule-based workflow demonstration · simulated customer inquiry"
    >
      <div className="demo-visual automation-stage">
        <div
          className="automation-path"
          style={{ "--workflow-progress": `${step * 25}%` } as CSSProperties}
        >
          {workflowSteps.map((name, i) => (
            <button
              key={name}
              onClick={() => setStep(i)}
              aria-pressed={step === i}
              className={`${step === i ? "active" : ""} ${step > i ? "complete" : ""}`}
            >
              <span>{step > i ? <Check size={16} /> : i + 1}</span>
              <small>{name}</small>
            </button>
          ))}
        </div>
        <div className="automation-message" key={`${step}-${inquiry}`}>
          <span className="demo-kicker">
            STEP {String(step + 1).padStart(2, "0")} / 05
          </span>
          {step === 0 ? (
            <MessageSquare size={26} />
          ) : step === 3 ? (
            <Mail size={26} />
          ) : step === 4 ? (
            <CheckCircle2 size={26} />
          ) : (
            <Layers size={26} />
          )}
          <h3>{workflowSteps[step]}</h3>
          <p>{content[step]}</p>
        </div>
      </div>
      <div className="demo-controls">
        <div className="demo-control-row">
          <label className="inline-select">
            Example inquiry
            <select
              value={inquiry}
              onChange={(e) => {
                setInquiry(e.target.value);
                setStep(0);
              }}
            >
              <option>Website project</option>
              <option>Video editing</option>
              <option>Digital marketing</option>
            </select>
          </label>
          <div className="demo-step-controls">
            <button
              className="demo-small-button"
              disabled={step === 0}
              onClick={() => setStep((p) => p - 1)}
            >
              <ArrowLeft size={14} /> Back
            </button>
            <button
              className="demo-primary-button"
              onClick={() => setStep((p) => (p === 4 ? 0 : p + 1))}
            >
              {step === 4 ? "Restart" : "Next step"}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}
function Maintenance() {
  const [fixes, setFixes] = useState<string[]>([]);
  const [mobile, setMobile] = useState(false);
  const options = [
    "Content hierarchy",
    "Responsive layout",
    "Visual consistency",
  ];
  return (
    <Shell
      identity="T5"
      label="Illustrative optimization · no measured performance claims"
    >
      <div
        className={`demo-visual maintenance-stage ${fixes.includes("Content hierarchy") ? "fix-hierarchy" : ""} ${fixes.includes("Visual consistency") ? "fix-consistency" : ""}`}
      >
        <div className="maintenance-preview">
          <MiniWebsite
            mobile={mobile}
            optimized={fixes.includes("Responsive layout")}
          />
          {!fixes.includes("Content hierarchy") && (
            <div className="maintenance-noise">
              Welcome! &nbsp; Discover more &nbsp; Explore now
            </div>
          )}
        </div>
      </div>
      <div className="demo-controls">
        <div className="demo-control-row">
          <span>Apply improvements</span>
          <button
            className="demo-small-button"
            aria-pressed={mobile}
            onClick={() => setMobile((p) => !p)}
          >
            {mobile ? <Monitor size={14} /> : <Smartphone size={14} />}{" "}
            {mobile ? "Desktop" : "Mobile"} preview
          </button>
        </div>
        <div className="maintenance-options">
          {options.map((f) => (
            <label key={f}>
              <input
                type="checkbox"
                checked={fixes.includes(f)}
                onChange={() =>
                  setFixes((p) =>
                    p.includes(f) ? p.filter((x) => x !== f) : [...p, f],
                  )
                }
              />
              {f}
            </label>
          ))}
        </div>
        <p className="demo-feedback" role="status">
          {fixes.length === 3
            ? "A clearer layout, considered hierarchy and consistent styling."
            : `${fixes.length} of 3 illustrative improvements applied. Toggle the controls to compare.`}
        </p>
      </div>
    </Shell>
  );
}
function Campaign() {
  const [platform, setPlatform] = useState("Meta");
  const [goal, setGoal] = useState("Awareness");
  const [audience, setAudience] = useState("Local community");
  return (
    <Shell
      identity="M1"
      label="BETA / COMING SOON · simulated campaign planning"
    >
      <div className="demo-visual campaign-stage">
        <div className="campaign-brief">
          <span className="demo-kicker">A CLEARER STARTING POINT.</span>
          <h3>
            The right message.
            <br />A considered plan.
          </h3>
          <label>
            Campaign objective
            <select value={goal} onChange={(e) => setGoal(e.target.value)}>
              <option>Awareness</option>
              <option>Website visits</option>
              <option>Inquiries</option>
            </select>
          </label>
          <label>
            Example audience
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            >
              <option>Local community</option>
              <option>Creative professionals</option>
              <option>Small business owners</option>
            </select>
          </label>
        </div>
        <div
          key={platform}
          className={`campaign-ad platform-${platform.toLowerCase()}`}
        >
          <span>
            {platform === "Meta"
              ? "Sponsored · Example business"
              : "Sponsored search result · Example business"}
          </span>
          {platform === "Meta" ? (
            <div className="campaign-ad-art">
              <Sparkles />
              <strong>
                A new
                <br />
                perspective.
              </strong>
            </div>
          ) : (
            <div className="search-ad">
              <small>example.invalid</small>
              <h4>A fresh perspective for your business</h4>
              <p>
                Explore a thoughtfully designed experience. Fictional campaign
                preview.
              </p>
            </div>
          )}
          <strong>
            {goal === "Awareness"
              ? "Meet something different."
              : goal === "Website visits"
                ? "Find your next inspiration."
                : "Let’s start a conversation."}
          </strong>
          <span className="campaign-ad-cta">
            {goal === "Awareness"
              ? "Discover more"
              : goal === "Website visits"
                ? "Visit example site"
                : "Send an inquiry"}{" "}
            <ChevronRight size={14} />
          </span>
        </div>
      </div>
      <div className="demo-controls">
        <div className="demo-control-row">
          <span>Explore the format</span>
          <Switcher
            label="Campaign platform"
            items={["Meta", "Google"]}
            value={platform}
            onChange={setPlatform}
          />
        </div>
        <p className="demo-feedback" role="status">
          Illustrative plan: {platform} · {goal} · {audience}. No campaign is
          launched and no performance is predicted.
        </p>
      </div>
    </Shell>
  );
}
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
function Planner() {
  const [day, setDay] = useState("Monday");
  const [plan, setPlan] = useState<Record<string, string>>({
    Monday: "Behind the scenes",
    Wednesday: "Product story",
    Friday: "Community moment",
  });
  const [formats, setFormats] = useState<Record<string, string>>({});
  const [frame, setFrame] = useState(0);
  const format = formats[day] || "Reel";
  const setFormat = (value: string) => {
    setFormats((p) => ({ ...p, [day]: value }));
    setFrame(0);
  };
  const postCopy: Record<string, string[]> = {
    "Behind the scenes": [
      "THE WORK BEFORE THE WORK.",
      "A LITTLE DETAIL. A BIG DIFFERENCE.",
      "COME INSIDE THE PROCESS.",
    ],
    "Product story": [
      "MADE FOR THE EVERYDAY.",
      "CONSIDERED FROM EVERY ANGLE.",
      "FIND YOUR NEW FAVOURITE.",
    ],
    "Community moment": [
      "GOOD THINGS START WITH PEOPLE.",
      "YOUR MOMENTS. OUR INSPIRATION.",
      "BE PART OF THE CONVERSATION.",
    ],
    "Helpful tip": [
      "ONE SMALL IDEA TO TRY.",
      "MAKE SPACE FOR WHAT MATTERS.",
      "SAVE IT FOR YOUR NEXT PROJECT.",
    ],
    "Studio update": [
      "SOMETHING NEW IS TAKING SHAPE.",
      "A GLIMPSE OF WHAT COMES NEXT.",
      "FOLLOW THE NEXT CHAPTER.",
    ],
  };
  return (
    <Shell
      identity="M2"
      label="BETA / COMING SOON · interactive concept content planner"
    >
      <div className="demo-visual planner-stage">
        <div className="planner-heading">
          <span className="demo-kicker">A WEEK WITH INTENTION.</span>
          <h3>
            More than a post.
            <br />A conversation.
          </h3>
        </div>
        <div className="planner-composition">
          <div className="planner-week">
            {days.map((d) => (
              <button
                key={d}
                onClick={() => {
                  setDay(d);
                  setFrame(0);
                }}
                aria-pressed={d === day}
                className={d === day ? "selected" : ""}
              >
                <span>{d.slice(0, 3).toUpperCase()}</span>
                <div>
                  {plan[d] ? (
                    <>
                      <div
                        className={`planner-art planner-art-${d.toLowerCase()}`}
                      >
                        <span aria-hidden="true">
                          {(formats[d] || "Reel") === "Carousel"
                            ? "▤"
                            : (formats[d] || "Reel") === "Story"
                              ? "◔"
                              : "▶"}
                        </span>
                      </div>
                      <strong>{plan[d]}</strong>
                    </>
                  ) : (
                    <>
                      <Plus size={23} />
                      <small>Plan a moment</small>
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>
          <section
            className={`planner-post-preview preview-${format.toLowerCase()} ${!plan[day] ? "preview-empty" : ""}`}
            aria-label={`${day} post preview`}
          >
            {plan[day] ? (
              <>
                <div className="planner-preview-top">
                  <span>
                    {format.toUpperCase()} /{" "}
                    {format === "Carousel" ? "1:1" : "9:16"}
                  </span>
                  <span>{day.toUpperCase()}</span>
                </div>
                <div
                  className="planner-post-frame"
                  key={`${day}-${format}-${frame}-${plan[day]}`}
                >
                  <div className="planner-post-shape" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                  {format === "Story" && (
                    <div className="story-frame-progress" aria-hidden="true">
                      {[0, 1, 2].map((i) => (
                        <i key={i} className={i <= frame ? "complete" : ""} />
                      ))}
                    </div>
                  )}
                  <span className="planner-post-label">{plan[day]}</span>
                  <h4>{postCopy[plan[day]][frame]}</h4>
                  <small>
                    {format === "Carousel"
                      ? `Slide ${frame + 1} of 3`
                      : format === "Story"
                        ? `Story frame ${frame + 1} of 3`
                        : `Shot ${frame + 1} of 3 · illustrative storyboard`}
                  </small>
                </div>
                <div className="planner-frame-controls">
                  <button
                    aria-label={`Previous ${format.toLowerCase()} ${format === "Carousel" ? "slide" : "frame"}`}
                    disabled={frame === 0}
                    onClick={() => setFrame((p) => p - 1)}
                  >
                    <ArrowLeft size={14} />
                  </button>
                  <span>{frame + 1} / 3</span>
                  <button
                    aria-label={`Next ${format.toLowerCase()} ${format === "Carousel" ? "slide" : "frame"}`}
                    disabled={frame === 2}
                    onClick={() => setFrame((p) => p + 1)}
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </>
            ) : (
              <div className="planner-empty-copy">
                <Plus size={26} />
                <h4>A little room for a new idea.</h4>
                <p>Choose a content idea below to build this day’s preview.</p>
              </div>
            )}
          </section>
        </div>
      </div>
      <div className="demo-controls">
        <div className="demo-control-row">
          <label className="inline-select">
            {day}'s content
            <select
              value={plan[day] || ""}
              onChange={(e) => {
                setPlan((p) => ({ ...p, [day]: e.target.value }));
                setFrame(0);
              }}
            >
              <option value="">No post planned</option>
              <option>Behind the scenes</option>
              <option>Product story</option>
              <option>Community moment</option>
              <option>Helpful tip</option>
              <option>Studio update</option>
            </select>
          </label>
          <Switcher
            label="Content preview format"
            items={["Reel", "Carousel", "Story"]}
            value={format}
            onChange={setFormat}
          />
        </div>
        <p className="demo-feedback" role="status">
          {plan[day]
            ? `${day}: ${plan[day]} — ${format} concept.`
            : `${day} is open. Choose a content idea to add it to the plan.`}{" "}
          Demo only; nothing is scheduled or published.
        </p>
      </div>
    </Shell>
  );
}
function Presence() {
  const [checks, setChecks] = useState<string[]>(["Business information"]);
  const [tab, setTab] = useState("Presence");
  const items = [
    "Business information",
    "Opening hours",
    "Service descriptions",
    "Profile imagery",
  ];
  return (
    <Shell
      identity="M3"
      label="BETA / COMING SOON · fictional local business · simulated overview"
    >
      <div className="demo-visual presence-stage">
        <div className="presence-map" data-view={tab}>
          <div className="presence-completion" aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="43"
                pathLength="100"
                style={{ strokeDasharray: `${checks.length * 25} 100` }}
              />
            </svg>
          </div>
          <div className="map-street one" />
          <div className="map-street two" />
          <div className="map-street three" />
          <div className="map-pin">
            <MapPin size={28} />
          </div>
          <span>ILLUSTRATIVE MAP · NO REAL LOCATION</span>
        </div>
        <div className="presence-profile">
          <span className="demo-kicker">EXAMPLE LOCAL BUSINESS</span>
          <h3>
            The neighbourhood
            <br />
            studio.
          </h3>
          <Switcher
            label="Local presence overview"
            items={["Presence", "Analytics"]}
            value={tab}
            onChange={setTab}
          />
          {tab === "Presence" ? (
            <>
              <p>Build a more complete profile, one useful detail at a time.</p>
              <div className="presence-checks">
                {items.map((item) => (
                  <label key={item}>
                    <input
                      type="checkbox"
                      checked={checks.includes(item)}
                      onChange={() =>
                        setChecks((p) =>
                          p.includes(item)
                            ? p.filter((x) => x !== item)
                            : [...p, item],
                        )
                      }
                    />
                    {item}
                  </label>
                ))}
              </div>
              <p className="demo-feedback" role="status">
                {checks.length} of {items.length} profile details included.
              </p>
            </>
          ) : (
            <div className="presence-analytics">
              <p>
                Illustrative activity only. These are fictional sample values,
                not client results.
              </p>
              <div>
                <span>Sample profile views</span>
                <strong>120</strong>
              </div>
              <div>
                <span>Sample website visits</span>
                <strong>24</strong>
              </div>
              <div>
                <span>Sample direction requests</span>
                <strong>8</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </Shell>
  );
}
export default function ServiceDemo({ id }: { id: string }) {
  switch (id) {
    case "V1":
      return <ShortForm />;
    case "V2":
      return <Podcast />;
    case "V3":
      return <Promo />;
    case "V4":
      return <Repurpose />;
    case "V5":
      return <Motion />;
    case "T1":
      return <Website />;
    case "T2":
      return <Store />;
    case "T3":
      return <Booking />;
    case "T4":
      return <Automation />;
    case "T5":
      return <Maintenance />;
    case "M1":
      return <Campaign />;
    case "M2":
      return <Planner />;
    case "M3":
      return <Presence />;
    default:
      return <p>Select a service to explore its demonstration.</p>;
  }
}
