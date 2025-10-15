import * as React from "react";

const PawLoading = ({ className }: { className?: string }) => {
  return (
    <>
      <style>
        {`
          @keyframes pawAnimation {
            0% {
              transform: translate(0.00px, 0.00px) rotate(0.00deg) scale(0.91, 0.91) skew(0deg, 0.00deg);
              opacity: 1.00;
            }
            4% {
              transform: translate(0.00px, 0.00px) rotate(0.00deg) scale(0.91, 0.91);
            }
            8% {
              animation-timing-function: cubic-bezier(0.69,0.60,0.35,0.27);
              transform: translate(0.00px, 0.00px) rotate(0.00deg) scale(0.91, 0.91);
            }
            14% {
              transform: translate(0.00px, 0.00px) rotate(0.00deg) scale(0.93, 0.93);
            }
            18% {
              transform: translate(0.00px, 0.00px) rotate(0.00deg) scale(0.94, 0.94);
            }
            22% {
              animation-timing-function: cubic-bezier(0.67,0.66,0.34,0.33);
              transform: translate(0.00px, 0.00px) rotate(0.00deg) scale(0.96, 0.96);
            }
            26% {
              transform: translate(0.00px, 0.00px) rotate(0.00deg) scale(0.97, 0.97);
            }
            30% {
              transform: translate(0.00px, 0.00px) rotate(0.00deg) scale(0.99, 0.99);
            }
            34% {
              animation-timing-function: cubic-bezier(0.65,0.71,0.32,0.38);
              transform: translate(0.00px, 0.00px) rotate(0.00deg) scale(1.01, 1.01);
            }
            40% {
              animation-timing-function: cubic-bezier(0.64,0.74,0.31,0.41);
              transform: translate(0.00px, 0.00px) rotate(0.00deg) scale(1.02, 1.02);
            }
            46% {
              animation-timing-function: cubic-bezier(0.60,0.91,0.23,0.63);
              transform: translate(0.00px, 0.00px) rotate(0.00deg) scale(1.03, 1.03);
            }
            50% {
              transform: translate(0.00px, 0.00px) rotate(0.00deg) scale(1.03, 1.03);
            }
            54% {
              transform: translate(0.00px, 0.00px) rotate(0.00deg) scale(1.03, 1.03);
            }
            58% {
              animation-timing-function: cubic-bezier(0.69,0.60,0.35,0.27);
              transform: translate(0.00px, 0.00px) rotate(0.00deg) scale(1.03, 1.03);
            }
            64% {
              transform: translate(0.00px, 0.00px) rotate(0.00deg) scale(1.01, 1.01);
            }
            68% {
              transform: translate(0.00px, 0.00px) rotate(0.00deg) scale(1.00, 1.00);
            }
            72% {
              animation-timing-function: cubic-bezier(0.67,0.66,0.34,0.33);
              transform: translate(0.00px, 0.00px) rotate(0.00deg) scale(0.98, 0.98);
            }
            76% {
              animation-timing-function: cubic-bezier(0.66,0.68,0.33,0.35);
              transform: translate(0.00px, 0.00px) rotate(0.00deg) scale(0.97, 0.97);
            }
            82% {
              animation-timing-function: cubic-bezier(0.65,0.71,0.32,0.38);
              transform: translate(0.00px, 0.00px) rotate(0.00deg) scale(0.94, 0.94);
            }
            88% {
              animation-timing-function: cubic-bezier(0.65,0.73,0.31,0.40);
              transform: translate(0.00px, 0.00px) rotate(0.00deg) scale(0.92, 0.92);
            }
            94% {
              animation-timing-function: cubic-bezier(0.63,0.80,0.28,0.48);
              transform: translate(0.00px, 0.00px) rotate(0.00deg) scale(0.91, 0.91);
            }
            100% {
              animation-timing-function: cubic-bezier(0.63,0.80,0.28,0.48);
              transform: translate(0.00px, 0.00px) rotate(0.00deg) scale(0.91, 0.91);
            }
          }
        `}
      </style>
      <svg
        xmlSpace="preserve"
        viewBox="0 0 100 100"
        y="0"
        x="0"
        xmlns="http://www.w3.org/2000/svg"
        style={{ margin: "initial", display: "block", shapeRendering: "auto", background: "transparent" }}
        preserveAspectRatio="xMidYMid"
        width="200"
        height="200"
        className={className}
      >
        <g
          className="ldl-scale"
          style={{ transformOrigin: "50% 50%", transform: "rotate(0deg) scale(0.8, 0.8)" }}
        >
          <g className="ldl-ani" style={{ transformBox: "view-box" }}>
            <g className="ldl-layer">
              <g
                className="ldl-ani"
                style={{ transformBox: "view-box", opacity: 1, transformOrigin: "50px 50px", animation: "pawAnimation 2s infinite -0.6s" }}
              >
                <path
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                  stroke="#333"
                  fill="#e15b64"
                  d="M56.172 82.307c-4.115-1.131-8.23-1.131-12.345 0-2.888.794-5.99.724-8.669-.615-6.565-3.283-9.41-11.579-4.715-18.064l8.561-11.824c5.35-7.39 16.343-7.438 21.759-.097l8.727 11.832c4.78 6.479 1.958 14.836-4.629 18.144-2.682 1.347-5.793 1.42-8.689.624z"
                  style={{ strokeWidth: "3.5", fill: "rgb(26, 86, 219)", stroke: "rgb(26, 86, 219)" }}
                ></path>
              </g>
            </g>
            <g className="ldl-layer">
              <g
                className="ldl-ani"
                style={{ transformBox: "view-box", opacity: 1, transformOrigin: "50px 50px", animation: "pawAnimation 2s infinite -0.7s" }}
              >
                <path
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                  stroke="#333"
                  fill="#e15b64"
                  d="M46.696 28.451c.892 7.819-2.119 12.705-8.015 13.378S28.75 38.42 27.858 30.601c-.892-7.819 3.614-12.876 8.015-13.378s9.93 3.409 10.823 11.228z"
                  style={{ strokeWidth: "3.5", fill: "rgb(26, 86, 219)", stroke: "rgb(26, 86, 219)" }}
                ></path>
              </g>
            </g>
            <g className="ldl-layer">
              <g
                className="ldl-ani"
                style={{ transformBox: "view-box", opacity: 1, transformOrigin: "50px 50px", animation: "pawAnimation 2s infinite -0.8s" }}
              >
                <path
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                  stroke="#333"
                  fill="#e15b64"
                  d="M26.288 44.147c4.044 5.721 3.785 10.824-.529 13.874-4.314 3.049-9.211 1.591-13.255-4.13s-2.692-11.597.529-13.874 9.211-1.591 13.255 4.13z"
                  style={{ strokeWidth: "3.5", fill: "rgb(26, 86, 219)", stroke: "rgb(26, 86, 219)" }}
                ></path>
              </g>
            </g>
            <g className="ldl-layer">
              <g
                className="ldl-ani"
                style={{ transformBox: "view-box", opacity: 1, transformOrigin: "50px 50px", animation: "pawAnimation 2s infinite -0.9s" }}
              >
                <path
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                  stroke="#333"
                  fill="#e15b64"
                  d="M73.712 44.147c-4.044 5.721-3.785 10.824.529 13.874 4.314 3.049 9.211 1.591 13.255-4.13s2.692-11.597-.529-13.874-9.211-1.591-13.255 4.13z"
                  style={{ strokeWidth: "3.5", fill: "rgb(26, 86, 219)", stroke: "rgb(26, 86, 219)" }}
                ></path>
              </g>
            </g>
            <g className="ldl-layer">
              <g
                className="ldl-ani"
                style={{ transformBox: "view-box", opacity: 1, transformOrigin: "50px 50px", animation: "pawAnimation 2s infinite -1s" }}
              >
                <path
                  strokeMiterlimit="10"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                  stroke="#333"
                  fill="#e15b64"
                  d="M53.304 28.451c-.892 7.819 2.119 12.705 8.015 13.378s9.931-3.409 10.823-11.228-3.614-12.876-8.015-13.378c-4.401-.502-9.93 3.409-10.823 11.228z"
                  style={{ strokeWidth: "3.5", fill: "rgb(26, 86, 219)", stroke: "rgb(26, 86, 219)" }}
                ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </>
  );
};

export default PawLoading;


