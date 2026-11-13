import { useId, useState } from "react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import {
  campaignObjectives,
  initialCampaignState,
  type CampaignState,
} from "../showcase-state";
import "../campaign-preview.css";

/** An illustrative campaign creative, never an ad account or performance report. */
export default function CampaignPreview({
  value,
  onChange,
  compact = false,
}: {
  value?: CampaignState;
  onChange?: (value: CampaignState) => void;
  compact?: boolean;
}) {
  const [local, setLocal] = useState<CampaignState>(initialCampaignState);
  const state = value ?? local;
  const content = campaignObjectives[state.objective];
  const id = useId().replace(/:/g, "");
  function change(next: CampaignState) {
    setLocal(next);
    onChange?.(next);
  }
  return (
    <div
      className={`campaign-preview${compact ? " campaign-preview--compact" : ""}`}
    >
      <div className="campaign-preview-heading">
        <span>GROW / DIGITAL MARKETING</span>
        <strong>BETA / COMING SOON</strong>
      </div>
      <div className="campaign-art-direction">
        <div
          className={`campaign-ad campaign-ad--placement-${state.placement} campaign-ad--creative-${state.creative}`}
          data-motion="media"
          data-motion-key={`${state.objective}-${state.creative}-${state.placement}`}
        >
          <div className="campaign-ad-label">
            <strong>still.</strong>
            <span>FICTIONAL CAFÉ / AD CONCEPT</span>
          </div>
          <div className="campaign-ad-art">
            {state.creative === "product" ? (
              <svg
                viewBox="0 0 500 420"
                role="img"
                aria-label="Original coffee cup artwork for the sample campaign"
              >
                <defs>
                  <linearGradient id={`${id}-cup`} x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="var(--home-paper)" />
                    <stop offset="1" stopColor="var(--home-violet-light)" />
                  </linearGradient>
                </defs>
                <ellipse
                  cx="250"
                  cy="349"
                  rx="155"
                  ry="18"
                  fill="var(--home-ink)"
                  opacity=".13"
                />
                <ellipse
                  cx="250"
                  cy="326"
                  rx="148"
                  ry="28"
                  fill="var(--home-paper)"
                />
                <path
                  d="M332 136h28c72 0 72 118-3 118h-29"
                  fill="none"
                  stroke="var(--home-violet-light)"
                  strokeWidth="25"
                />
                <path
                  d="M151 120h196v151q0 62-98 62t-98-62Z"
                  fill={`url(#${id}-cup)`}
                />
                <ellipse
                  cx="249"
                  cy="120"
                  rx="98"
                  ry="28"
                  fill="var(--home-paper)"
                />
                <ellipse
                  cx="249"
                  cy="122"
                  rx="82"
                  ry="18"
                  fill="var(--home-night)"
                />
                <path
                  d="M212 84c-24-29 22-33 0-62m38 62c-24-29 22-33 0-62m38 62c-24-29 22-33 0-62"
                  fill="none"
                  stroke="var(--home-paper)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity=".65"
                />
                <text
                  x="248"
                  y="241"
                  textAnchor="middle"
                  fill="var(--home-violet-ink)"
                  fontSize="42"
                  fontWeight="700"
                >
                  still.
                </text>
              </svg>
            ) : (
              <img
                src="/images/coffee.jpg"
                alt="Friends sharing coffee, used for a fictional café campaign"
                width="1200"
                height="800"
                loading="lazy"
              />
            )}
          </div>
          <div className="campaign-ad-copy">
            <span>
              {state.creative === "product"
                ? "A MOMENT, THOUGHTFULLY MADE."
                : "BETTER, TOGETHER."}
            </span>
            <h3>{content.headline}</h3>
            <div className="campaign-sample-action">
              {content.action}
              <ArrowUpRight size={16} />
            </div>
          </div>
          <span className="campaign-placement-label">
            {state.placement === "feed" ? "FEED / 1:1" : "STORY / 9:16"} ·
            ILLUSTRATIVE PLACEMENT
          </span>
        </div>
        <div className="campaign-art-note">
          <span>THE IDEA</span>
          <p>{content.body}</p>
          <small>
            Sample creative direction only. No campaign is running and no
            results are claimed.
          </small>
        </div>
      </div>
      <div className="campaign-controls">
        <label htmlFor={`${id}-objective`}>
          Campaign objective
          <select
            id={`${id}-objective`}
            value={state.objective}
            onChange={(event) =>
              change({
                ...state,
                objective: event.target.value as CampaignState["objective"],
              })
            }
          >
            {Object.entries(campaignObjectives).map(([key, option]) => (
              <option key={key} value={key}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <div role="group" aria-label="Ad creative">
          <span>Creative</span>
          <div>
            {(
              [
                ["product", "Product focus"],
                ["story", "People & story"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                aria-pressed={state.creative === key}
                onClick={() => change({ ...state, creative: key })}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div role="group" aria-label="Ad placement">
          <span>Placement</span>
          <div>
            {(
              [
                ["feed", "Feed"],
                ["story", "Story"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                aria-pressed={state.placement === key}
                onClick={() => change({ ...state, placement: key })}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="campaign-preview-footer">
        <p>
          Illustrative campaign preview. Beta services are not yet available.
        </p>
        <button
          type="button"
          onClick={() => change({ ...initialCampaignState })}
        >
          <RotateCcw size={14} />
          Reset campaign preview
        </button>
      </div>
    </div>
  );
}
