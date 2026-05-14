'use client'

import { motion } from 'framer-motion'

type Props = {
  className?: string
  showAnnotations?: boolean
}

/**
 * TPG Gym Kiosk — wall-mounted dual-display terminal ("Industrial Hex").
 *
 * Two identical 1920×1080 panels (16:9), drawn at 240×135 in this viewBox.
 * Top mounted landscape, bottom mounted portrait (rotated 90° → 135×240).
 * Both share a 20px bezel margin.
 *
 * ViewBox: 600 × 780
 */

const PANEL_W = 240 // 1920 / 8
const PANEL_H = 135 // 1080 / 8  (16:9 exact)
const BEZEL = 20

// Top landscape — screen well centered horizontally
const TOP_SCREEN_X = 180 // (600 - 240) / 2
const TOP_SCREEN_Y = 92
const TOP_HOUSE_X = TOP_SCREEN_X - BEZEL // 160
const TOP_HOUSE_Y = TOP_SCREEN_Y - BEZEL // 72
const TOP_HOUSE_W = PANEL_W + BEZEL * 2 // 280
const TOP_HOUSE_H = PANEL_H + BEZEL * 2 // 175

// Bottom portrait — same panel, rotated 90° → 135 × 240
const BOT_SCREEN_W = PANEL_H // 135
const BOT_SCREEN_H = PANEL_W // 240
const BOT_SCREEN_X = (600 - BOT_SCREEN_W) / 2 // 232.5
const BOT_SCREEN_Y = 360
const BOT_HOUSE_X = BOT_SCREEN_X - BEZEL // 212.5
const BOT_HOUSE_Y = BOT_SCREEN_Y - BEZEL // 340
const BOT_HOUSE_W = BOT_SCREEN_W + BEZEL * 2 // 175
const BOT_HOUSE_H = BOT_SCREEN_H + BEZEL * 2 // 280

export function KioskSilhouette({ className, showAnnotations = true }: Props) {
  return (
    <svg
      viewBox="0 0 600 780"
      className={className}
      role="img"
      aria-label="TPG wall-mounted industrial gym kiosk"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="wallGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#1A1A18" />
          <stop offset="50%" stopColor="#222220" />
          <stop offset="100%" stopColor="#161614" />
        </linearGradient>
        <linearGradient id="bodyGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1F1F1D" />
          <stop offset="55%" stopColor="#0F0F0E" />
          <stop offset="100%" stopColor="#070706" />
        </linearGradient>
        <linearGradient id="bezelGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2A2A28" />
          <stop offset="100%" stopColor="#101010" />
        </linearGradient>
        {/* Active screen — cool slate; reads clearly vs warm matte-black body */}
        <linearGradient id="screenGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#323942" />
          <stop offset="50%" stopColor="#242A33" />
          <stop offset="100%" stopColor="#1A1F26" />
        </linearGradient>
        {/* Top edge specular highlight on glass */}
        <linearGradient id="screenGloss" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.16" />
          <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* HEX PERFORATION — flat-top honeycomb pattern */}
        <pattern
          id="hexPerf"
          patternUnits="userSpaceOnUse"
          width="12"
          height="6.928"
        >
          <rect width="12" height="6.928" fill="#272725" />
          <polygon
            points="2.5,3.464 4.25,0.433 7.75,0.433 9.5,3.464 7.75,6.495 4.25,6.495"
            fill="#050505"
          />
          <polygon
            points="-3.5,0 -1.75,-3.031 1.75,-3.031 3.5,0 1.75,3.031 -1.75,3.031"
            fill="#050505"
          />
          <polygon
            points="8.5,0 10.25,-3.031 13.75,-3.031 15.5,0 13.75,3.031 10.25,3.031"
            fill="#050505"
          />
          <polygon
            points="-3.5,6.928 -1.75,3.897 1.75,3.897 3.5,6.928 1.75,9.959 -1.75,9.959"
            fill="#050505"
          />
          <polygon
            points="8.5,6.928 10.25,3.897 13.75,3.897 15.5,6.928 13.75,9.959 10.25,9.959"
            fill="#050505"
          />
        </pattern>

        <clipPath id="topScreenClip">
          <rect
            x={TOP_SCREEN_X}
            y={TOP_SCREEN_Y}
            width={PANEL_W}
            height={PANEL_H}
          />
        </clipPath>
        <clipPath id="bottomScreenClip">
          <rect
            x={BOT_SCREEN_X}
            y={BOT_SCREEN_Y}
            width={BOT_SCREEN_W}
            height={BOT_SCREEN_H}
          />
        </clipPath>
      </defs>

      {/* === Wall === */}
      <rect x="0" y="0" width="600" height="780" fill="url(#wallGrad)" />

      {/* Mount shadow */}
      <rect x="42" y="48" width="516" height="690" rx="10" fill="#000" opacity="0.55" />
      <rect x="36" y="42" width="528" height="702" rx="10" fill="#000" opacity="0.35" />

      <motion.g
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {/* === Outer body plate === */}
        <rect x="30" y="38" width="540" height="704" rx="10" fill="url(#bodyGrad)" />
        <rect
          x="30"
          y="38"
          width="540"
          height="704"
          rx="10"
          fill="none"
          stroke="#3A3A37"
          strokeWidth="0.8"
        />
        <rect
          x="36"
          y="44"
          width="528"
          height="692"
          rx="7"
          fill="none"
          stroke="#0A0A0A"
          strokeWidth="0.6"
          opacity="0.9"
        />

        {/* Corner bolts */}
        {[[62, 70], [538, 70], [62, 710], [538, 710]].map(([cx, cy]) => (
          <g key={`bolt-${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="9" fill="#161614" stroke="#3A3A37" strokeWidth="0.5" />
            <circle cx={cx} cy={cy} r="5" fill="#0A0A0A" />
            <line
              x1={cx - 3}
              y1={cy - 3}
              x2={cx + 3}
              y2={cy + 3}
              stroke="#3A3A37"
              strokeWidth="0.6"
            />
          </g>
        ))}

        {/* === TOP LANDSCAPE DISPLAY === panel 240 × 140 === */}
        <rect
          x={TOP_HOUSE_X}
          y={TOP_HOUSE_Y}
          width={TOP_HOUSE_W}
          height={TOP_HOUSE_H}
          rx="4"
          fill="url(#bezelGrad)"
          stroke="#3A3A37"
          strokeWidth="0.4"
        />
        <rect
          x={TOP_SCREEN_X}
          y={TOP_SCREEN_Y}
          width={PANEL_W}
          height={PANEL_H}
          rx="2"
          fill="url(#screenGrad)"
        />
        <rect
          x={TOP_SCREEN_X}
          y={TOP_SCREEN_Y}
          width={PANEL_W}
          height={PANEL_H}
          rx="2"
          fill="none"
          stroke="#6B6B66"
          strokeWidth="0.8"
          opacity="0.7"
        />

        <g clipPath="url(#topScreenClip)">
          {/* Brand on landscape display */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <g transform={`translate(${TOP_SCREEN_X + PANEL_W / 2}, ${TOP_SCREEN_Y + 60})`}>
              <rect x="-26" y="-10" width="52" height="20" fill="none" stroke="#D72323" strokeWidth="2.6" />
              <rect x="-32" y="-6" width="5" height="12" fill="#D72323" />
              <rect x="27" y="-6" width="5" height="12" fill="#D72323" />
              <line x1="-26" y1="0" x2="26" y2="0" stroke="#D72323" strokeWidth="1.2" />
            </g>
            <text
              x={TOP_SCREEN_X + PANEL_W / 2}
              y={TOP_SCREEN_Y + 102}
              textAnchor="middle"
              fill="#F4F4F1"
              fontFamily="Impact, Oswald, sans-serif"
              fontSize="24"
              fontWeight="900"
              letterSpacing="3"
            >
              TPG
            </text>
            <text
              x={TOP_SCREEN_X + PANEL_W / 2}
              y={TOP_SCREEN_Y + 122}
              textAnchor="middle"
              fill="#D72323"
              fontFamily="ui-monospace, monospace"
              fontSize="8"
              letterSpacing="6"
            >
              FITNESS
            </text>
          </motion.g>

          {/* Scanlines */}
          <g opacity="0.12">
            {Array.from({ length: 22 }).map((_, i) => (
              <line
                key={i}
                x1={TOP_SCREEN_X}
                y1={TOP_SCREEN_Y + 2 + i * 6}
                x2={TOP_SCREEN_X + PANEL_W}
                y2={TOP_SCREEN_Y + 2 + i * 6}
                stroke="#fff"
                strokeWidth="0.3"
              />
            ))}
          </g>

          {/* Glass top highlight */}
          <rect
            x={TOP_SCREEN_X}
            y={TOP_SCREEN_Y}
            width={PANEL_W}
            height={PANEL_H * 0.5}
            fill="url(#screenGloss)"
          />
        </g>

        {/* === SENSOR STRIP === */}
        <rect x="100" y="270" width="400" height="40" fill="#0A0A0A" />
        <rect x="100" y="270" width="400" height="40" fill="none" stroke="#3A3A37" strokeWidth="0.4" />
        <g opacity="0.4">
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1="100"
              y1={278 + i * 9}
              x2="500"
              y2={278 + i * 9}
              stroke="#2A2A28"
              strokeWidth="0.3"
            />
          ))}
        </g>

        {/* Central camera */}
        <circle cx="300" cy="290" r="10" fill="#050505" stroke="#3A3A37" strokeWidth="0.6" />
        <circle cx="300" cy="290" r="6" fill="#0F0F0E" />
        <circle cx="300" cy="290" r="2.2" fill="#1A1A18" />
        <circle cx="298" cy="288" r="0.8" fill="#3A3A37" />

        <circle cx="260" cy="290" r="1.4" fill="#D72323" opacity="0.9" />
        <circle cx="340" cy="290" r="1.4" fill="#3A3A37" />
        <rect x="370" y="287" width="14" height="6" fill="#050505" stroke="#3A3A37" strokeWidth="0.3" />
        <rect x="216" y="287" width="14" height="6" fill="#050505" stroke="#3A3A37" strokeWidth="0.3" />

        {/* === Left hex flank === */}
        <rect x="60" y="320" width="140" height="400" rx="4" fill="url(#hexPerf)" />
        <rect
          x="60"
          y="320"
          width="140"
          height="400"
          rx="4"
          fill="none"
          stroke="#3A3A37"
          strokeWidth="0.4"
        />
        {[[78, 340], [182, 340], [78, 700], [182, 700]].map(([cx, cy]) => (
          <circle
            key={`lf-${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="3"
            fill="#0A0A0A"
            stroke="#3A3A37"
            strokeWidth="0.4"
          />
        ))}

        {/* === Right hex flank === */}
        <rect x="400" y="320" width="140" height="400" rx="4" fill="url(#hexPerf)" />
        <rect
          x="400"
          y="320"
          width="140"
          height="400"
          rx="4"
          fill="none"
          stroke="#3A3A37"
          strokeWidth="0.4"
        />
        {[[418, 340], [522, 340], [418, 700], [522, 700]].map(([cx, cy]) => (
          <circle
            key={`rf-${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="3"
            fill="#0A0A0A"
            stroke="#3A3A37"
            strokeWidth="0.4"
          />
        ))}

        {/* Biometric disc — right flank, upper */}
        <g>
          <circle cx="470" cy="410" r="34" fill="#0A0A0A" stroke="#3A3A37" strokeWidth="1" />
          <circle cx="470" cy="410" r="28" fill="#161614" />
          <circle cx="470" cy="410" r="23" fill="none" stroke="#3A3A37" strokeWidth="0.6" />
          <g stroke="#D72323" strokeWidth="0.8" fill="none" opacity="0.85">
            <path d="M 456 419 Q 470 399 484 419" />
            <path d="M 454 423 Q 470 401 486 423" />
            <path d="M 460 415 Q 470 404 480 415" />
            <path d="M 464 412 Q 470 407 476 412" />
          </g>
          <motion.circle
            cx="470"
            cy="410"
            r="23"
            fill="none"
            stroke="#D72323"
            strokeWidth="0.8"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.7, 0], scale: [1, 1.6, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
            style={{ transformOrigin: '470px 410px' }}
          />
        </g>

        {/* NFC aux — right flank, lower */}
        <g>
          <rect x="442" y="610" width="56" height="40" rx="3" fill="#0A0A0A" stroke="#3A3A37" strokeWidth="0.5" />
          <text
            x="470"
            y="626"
            textAnchor="middle"
            fill="#8A8A86"
            fontFamily="ui-monospace, monospace"
            fontSize="6"
            letterSpacing="1.5"
          >
            NFC
          </text>
          <circle cx="470" cy="638" r="4" fill="none" stroke="#D72323" strokeWidth="0.8" />
          <circle cx="470" cy="638" r="1.6" fill="#D72323" />
        </g>

        {/* === BOTTOM PORTRAIT DISPLAY === same panel, rotated 90° === */}
        <rect
          x={BOT_HOUSE_X}
          y={BOT_HOUSE_Y}
          width={BOT_HOUSE_W}
          height={BOT_HOUSE_H}
          rx="4"
          fill="url(#bezelGrad)"
          stroke="#3A3A37"
          strokeWidth="0.4"
        />
        <rect
          x={BOT_SCREEN_X}
          y={BOT_SCREEN_Y}
          width={BOT_SCREEN_W}
          height={BOT_SCREEN_H}
          rx="2"
          fill="url(#screenGrad)"
        />
        <rect
          x={BOT_SCREEN_X}
          y={BOT_SCREEN_Y}
          width={BOT_SCREEN_W}
          height={BOT_SCREEN_H}
          rx="2"
          fill="none"
          stroke="#6B6B66"
          strokeWidth="0.8"
          opacity="0.7"
        />

        {/* Glass top highlight on portrait screen */}
        <rect
          x={BOT_SCREEN_X}
          y={BOT_SCREEN_Y}
          width={BOT_SCREEN_W}
          height={BOT_SCREEN_H * 0.4}
          fill="url(#screenGloss)"
        />

        <g clipPath="url(#bottomScreenClip)">
          {/* Status bar */}
          <rect x={BOT_SCREEN_X} y={BOT_SCREEN_Y} width={BOT_SCREEN_W} height="16" fill="#0A0A0A" />
          <text
            x={BOT_SCREEN_X + 6}
            y={BOT_SCREEN_Y + 11}
            fill="#8A8A86"
            fontFamily="ui-monospace, monospace"
            fontSize="6"
            letterSpacing="1"
          >
            TPG_OS
          </text>
          <circle cx={BOT_SCREEN_X + BOT_SCREEN_W - 18} cy={BOT_SCREEN_Y + 8} r="1.6" fill="#D72323" />
          <text
            x={BOT_SCREEN_X + BOT_SCREEN_W - 6}
            y={BOT_SCREEN_Y + 11}
            textAnchor="end"
            fill="#8A8A86"
            fontFamily="ui-monospace, monospace"
            fontSize="6"
            letterSpacing="1"
          >
            LIVE
          </text>

          {/* Member header */}
          <rect
            x={BOT_SCREEN_X + 6}
            y={BOT_SCREEN_Y + 22}
            width={BOT_SCREEN_W - 12}
            height="24"
            fill="#D72323"
          />
          <text
            x={BOT_SCREEN_X + 10}
            y={BOT_SCREEN_Y + 32}
            fill="#F4F4F1"
            fontFamily="ui-monospace, monospace"
            fontSize="6.5"
            letterSpacing="1"
          >
            MEMBER · 0042
          </text>
          <text
            x={BOT_SCREEN_X + 10}
            y={BOT_SCREEN_Y + 42}
            fill="#F4F4F1"
            fontFamily="ui-monospace, monospace"
            fontSize="5.5"
            letterSpacing="0.6"
            opacity="0.85"
          >
            DAY 184 · UPPER A
          </text>

          {/* List header */}
          <text
            x={BOT_SCREEN_X + 6}
            y={BOT_SCREEN_Y + 62}
            fill="#8A8A86"
            fontFamily="ui-monospace, monospace"
            fontSize="5.5"
            letterSpacing="1.2"
          >
            TODAY · 06 SETS
          </text>

          {/* Workout rows */}
          {[
            { i: 0, name: 'BENCH PRESS', val: '87.5kg · 5×5', done: true },
            { i: 1, name: 'OHP', val: '52.5kg · 4×6', done: true },
            { i: 2, name: 'INCLINE DB', val: '24kg · 3×8', done: true },
            { i: 3, name: 'CABLE FLY', val: '20kg · 3×12', done: false, active: true },
            { i: 4, name: 'TRICEP ROPE', val: '25kg · 3×12', done: false },
            { i: 5, name: 'LATERAL', val: '8kg · 3×15', done: false },
          ].map((row) => {
            const y = BOT_SCREEN_Y + 72 + row.i * 20
            return (
              <g key={row.name}>
                <rect
                  x={BOT_SCREEN_X + 6}
                  y={y}
                  width={BOT_SCREEN_W - 12}
                  height="16"
                  fill={row.active ? '#1F1F1D' : 'transparent'}
                  stroke="#3A3A37"
                  strokeWidth="0.3"
                  opacity={row.done ? 0.55 : 1}
                />
                <rect
                  x={BOT_SCREEN_X + 9}
                  y={y + 6}
                  width="3"
                  height="4"
                  fill={row.done || row.active ? '#D72323' : '#3A3A37'}
                />
                <text
                  x={BOT_SCREEN_X + 16}
                  y={y + 7}
                  fill={row.done ? '#8A8A86' : '#F4F4F1'}
                  fontFamily="ui-monospace, monospace"
                  fontSize="5.5"
                  letterSpacing="0.5"
                  textDecoration={row.done ? 'line-through' : 'none'}
                >
                  {row.name}
                </text>
                <text
                  x={BOT_SCREEN_X + 16}
                  y={y + 13}
                  fill="#8A8A86"
                  fontFamily="ui-monospace, monospace"
                  fontSize="5"
                  letterSpacing="0.4"
                >
                  {row.val}
                </text>
                {row.active && (
                  <text
                    x={BOT_SCREEN_X + BOT_SCREEN_W - 8}
                    y={y + 10}
                    textAnchor="end"
                    fill="#D72323"
                    fontFamily="ui-monospace, monospace"
                    fontSize="5"
                    letterSpacing="1"
                  >
                    NOW
                  </text>
                )}
              </g>
            )
          })}

          {/* Progress block */}
          <rect
            x={BOT_SCREEN_X + 6}
            y={BOT_SCREEN_Y + 196}
            width={BOT_SCREEN_W - 12}
            height="20"
            fill="#0A0A0A"
            stroke="#3A3A37"
            strokeWidth="0.3"
          />
          <text
            x={BOT_SCREEN_X + 10}
            y={BOT_SCREEN_Y + 206}
            fill="#8A8A86"
            fontFamily="ui-monospace, monospace"
            fontSize="5"
            letterSpacing="1"
          >
            PROGRESS
          </text>
          <rect
            x={BOT_SCREEN_X + 56}
            y={BOT_SCREEN_Y + 205}
            width="74"
            height="4"
            fill="#3A3A37"
          />
          <rect
            x={BOT_SCREEN_X + 56}
            y={BOT_SCREEN_Y + 205}
            width="42"
            height="4"
            fill="#D72323"
          />
          <text
            x={BOT_SCREEN_X + BOT_SCREEN_W - 8}
            y={BOT_SCREEN_Y + 213}
            textAnchor="end"
            fill="#F4F4F1"
            fontFamily="ui-monospace, monospace"
            fontSize="6"
            letterSpacing="0.5"
          >
            58%
          </text>

          {/* Action button */}
          <rect
            x={BOT_SCREEN_X + 6}
            y={BOT_SCREEN_Y + 220}
            width={BOT_SCREEN_W - 12}
            height="14"
            fill="#D72323"
          />
          <text
            x={BOT_SCREEN_X + BOT_SCREEN_W / 2}
            y={BOT_SCREEN_Y + 230}
            textAnchor="middle"
            fill="#F4F4F1"
            fontFamily="ui-monospace, monospace"
            fontSize="7"
            letterSpacing="2.5"
          >
            CONTINUE →
          </text>

          {/* Vertical scan sweep */}
          <motion.rect
            x={BOT_SCREEN_X}
            y={BOT_SCREEN_Y}
            width={BOT_SCREEN_W}
            height="6"
            fill="#D72323"
            opacity="0.6"
            initial={{ y: BOT_SCREEN_Y }}
            animate={{
              y: [BOT_SCREEN_Y, BOT_SCREEN_Y + BOT_SCREEN_H - 6, BOT_SCREEN_Y],
            }}
            transition={{ duration: 5.4, repeat: Infinity, ease: 'linear', delay: 2.2 }}
          />
        </g>

        {/* Brand etching at bottom */}
        <g transform="translate(300, 720)">
          <rect x="-9" y="-9" width="18" height="18" fill="none" stroke="#3A3A37" strokeWidth="0.6" />
          <rect x="-12" y="-3" width="3" height="6" fill="#3A3A37" />
          <rect x="9" y="-3" width="3" height="6" fill="#3A3A37" />
          <text
            x="20"
            y="3"
            fill="#3A3A37"
            fontFamily="ui-monospace, monospace"
            fontSize="7"
            letterSpacing="3"
          >
            TPG · FITNESS
          </text>
        </g>
      </motion.g>

      {showAnnotations && (
        <g
          fontFamily="ui-monospace, monospace"
          fontSize="7"
          letterSpacing="1.5"
          fill="#8A8A86"
        >
          <line x1="440" y1="162" x2="572" y2="162" stroke="#8A8A86" strokeWidth="0.3" />
          <text x="572" y="165">A · 240×140 · LANDSCAPE</text>

          <line x1="500" y1="290" x2="572" y2="290" stroke="#8A8A86" strokeWidth="0.3" />
          <text x="572" y="293">B · CAMERA</text>

          <line x1="540" y1="410" x2="572" y2="410" stroke="#8A8A86" strokeWidth="0.3" />
          <text x="572" y="402">C · BIOMETRIC</text>

          <line x1="390" y1="480" x2="572" y2="480" stroke="#8A8A86" strokeWidth="0.3" />
          <text x="572" y="483">D · 140×240 · PORTRAIT</text>

          <line x1="60" y1="500" x2="12" y2="500" stroke="#8A8A86" strokeWidth="0.3" />
          <text x="10" y="494" textAnchor="end">E · HEX FLANK</text>

          <line x1="60" y1="660" x2="12" y2="660" stroke="#8A8A86" strokeWidth="0.3" />
          <text x="10" y="654" textAnchor="end">F · VENT</text>
        </g>
      )}
    </svg>
  )
}
