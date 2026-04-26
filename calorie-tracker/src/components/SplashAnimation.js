import React, { useEffect, useRef } from 'react';
import {
  View, Text, Animated, Easing, StyleSheet, Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const BG      = '#080C14';
const CYAN    = '#00D4D8';
const GOLD    = '#C9A84C';
const WHITE   = '#FFFFFF';

const RUNE_T  = 'ᚠ  ᚢ  ᚦ  ᚨ  ᚱ  ᚲ  ᚷ  ᚹ  ᚺ  ᚾ';
const RUNE_B  = 'ᛁ  ᛃ  ᛇ  ᛈ  ᛉ  ᛊ  ᛏ  ᛒ  ᛖ  ᛗ';
const BORDER  = '═══════════════════════════';

export default function SplashAnimation({ onFinish }) {
  const runesOp     = useRef(new Animated.Value(0)).current;
  const borderOp    = useRef(new Animated.Value(0)).current;
  const axeOp       = useRef(new Animated.Value(0)).current;
  const axeY        = useRef(new Animated.Value(-30)).current;
  const logoScale   = useRef(new Animated.Value(0.2)).current;
  const logoOp      = useRef(new Animated.Value(0)).current;
  const glowOp      = useRef(new Animated.Value(0.1)).current;
  const lineW       = useRef(new Animated.Value(0)).current;
  const titleOp     = useRef(new Animated.Value(0)).current;
  const titleY      = useRef(new Animated.Value(40)).current;
  const tagOp       = useRef(new Animated.Value(0)).current;
  const shieldOp    = useRef(new Animated.Value(0)).current;

  // Break / impact effect values
  const flashOp     = useRef(new Animated.Value(0)).current;
  const breakScale  = useRef(new Animated.Value(1)).current;
  const breakOp     = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowOp, { toValue: 1,   duration: 800, useNativeDriver: true }),
        Animated.timing(glowOp, { toValue: 0.1, duration: 800, useNativeDriver: true }),
      ])
    );

    const mainSequence = Animated.sequence([

      // Phase 1 — frame, borders, runes appear
      Animated.parallel([
        Animated.timing(borderOp, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(runesOp,  { toValue: 1, duration: 700, useNativeDriver: true }),
      ]),

      // Phase 2 — axes drop in from above
      Animated.parallel([
        Animated.timing(axeOp, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(axeY,  {
          toValue: 0, duration: 400,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
      ]),

      Animated.delay(100),

      // Phase 3 — A slams in
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.back(1.4)),
          useNativeDriver: true,
        }),
        Animated.timing(logoOp, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),

      // Phase 4 — heartbeat line
      Animated.timing(lineW, { toValue: 1, duration: 500, useNativeDriver: false }),

      // Phase 5 — shields appear
      Animated.timing(shieldOp, { toValue: 1, duration: 400, useNativeDriver: true }),

      // Phase 6 — ANZHU slides up
      Animated.parallel([
        Animated.timing(titleOp, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(titleY,  {
          toValue: 0, duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),

      // Phase 7 — tagline
      Animated.timing(tagOp, { toValue: 1, duration: 400, useNativeDriver: true }),

      // Phase 8 — hold, let glow breathe
      Animated.delay(1200),

      // ── BREAKING IMPACT ─────────────────────────────────────────
      // Step 1: A charges up (quick scale up + intense glow)
      Animated.parallel([
        Animated.timing(breakScale, {
          toValue: 1.4,
          duration: 200,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(flashOp, { toValue: 0.4, duration: 200, useNativeDriver: true }),
      ]),

      // Step 2: IMPACT — flash to full white
      Animated.timing(flashOp, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),

      // Step 3: Everything shatters away (scale explodes outward)
      Animated.parallel([
        Animated.timing(breakScale, {
          toValue: 8,
          duration: 350,
          easing: Easing.in(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(breakOp, { toValue: 0, duration: 350, useNativeDriver: true }),
        Animated.timing(flashOp, { toValue: 0, duration: 350, useNativeDriver: true }),
      ]),
    ]);

    mainSequence.start(() => {
      glowLoop.stop();
      onFinish?.();
    });

    // Start glow after A appears (~1600ms)
    const glowTimer = setTimeout(() => glowLoop.start(), 1600);

    return () => {
      clearTimeout(glowTimer);
      glowLoop.stop();
    };
  }, []);

  const lineWidthInterp = lineW.interpolate({
    inputRange: [0, 1], outputRange: [0, width * 0.55],
  });

  return (
    <View style={styles.container}>

      {/* Full-screen flash overlay */}
      <Animated.View style={[styles.flashOverlay, { opacity: flashOp }]} pointerEvents="none" />

      {/* Everything that breaks */}
      <Animated.View style={[
        styles.breakWrapper,
        { opacity: breakOp, transform: [{ scale: breakScale }] },
      ]}>

        {/* Corner brackets */}
        <Animated.View style={[styles.cornerTL, { opacity: borderOp }]} />
        <Animated.View style={[styles.cornerTR, { opacity: borderOp }]} />
        <Animated.View style={[styles.cornerBL, { opacity: borderOp }]} />
        <Animated.View style={[styles.cornerBR, { opacity: borderOp }]} />

        {/* Top runes */}
        <Animated.Text style={[styles.runes, styles.runesTop, { opacity: runesOp }]}>
          {RUNE_T}
        </Animated.Text>

        {/* Top border line */}
        <Animated.Text style={[styles.borderLine, styles.borderTop, { opacity: borderOp }]}>
          {BORDER}
        </Animated.Text>

        {/* Axes */}
        <Animated.View style={[
          styles.axeRow,
          { opacity: axeOp, transform: [{ translateY: axeY }] },
        ]}>
          <Text style={styles.axe}>⚔</Text>
          <Text style={styles.axeSpacer}>✦</Text>
          <Text style={styles.axe}>⚔</Text>
        </Animated.View>

        {/* Glow halo behind A */}
        <Animated.Text style={[styles.glowHalo, { opacity: glowOp }]}>A</Animated.Text>

        {/* Main A */}
        <Animated.Text style={[
          styles.logoText,
          { opacity: logoOp, transform: [{ scale: logoScale }] },
        ]}>
          A
        </Animated.Text>

        {/* Heartbeat line */}
        <View style={styles.lineRow}>
          <Animated.View style={[styles.line, { width: lineWidthInterp }]} />
        </View>

        {/* Shields flanking the title */}
        <Animated.View style={[styles.shieldRow, { opacity: shieldOp }]}>
          <Text style={styles.shield}>🛡</Text>
          {/* ANZHU title */}
          <Animated.View style={{
            opacity: titleOp,
            transform: [{ translateY: titleY }],
          }}>
            <Text style={styles.title}>ANZHU</Text>
          </Animated.View>
          <Text style={styles.shield}>🛡</Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.Text style={[styles.tagline, { opacity: tagOp }]}>
          ⚔   Fight Every Day   ⚔
        </Animated.Text>

        {/* Bottom border line */}
        <Animated.Text style={[styles.borderLine, styles.borderBottom, { opacity: borderOp }]}>
          {BORDER}
        </Animated.Text>

        {/* Bottom runes */}
        <Animated.Text style={[styles.runes, styles.runesBottom, { opacity: runesOp }]}>
          {RUNE_B}
        </Animated.Text>

      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    alignItems: 'center',
    justifyContent: 'center',
  },

  flashOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: CYAN,
    zIndex: 99,
  },

  breakWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Corners
  cornerTL: {
    position: 'absolute', top: 50, left: 24,
    width: 36, height: 36,
    borderTopWidth: 2, borderLeftWidth: 2, borderColor: CYAN,
  },
  cornerTR: {
    position: 'absolute', top: 50, right: 24,
    width: 36, height: 36,
    borderTopWidth: 2, borderRightWidth: 2, borderColor: CYAN,
  },
  cornerBL: {
    position: 'absolute', bottom: 50, left: 24,
    width: 36, height: 36,
    borderBottomWidth: 2, borderLeftWidth: 2, borderColor: CYAN,
  },
  cornerBR: {
    position: 'absolute', bottom: 50, right: 24,
    width: 36, height: 36,
    borderBottomWidth: 2, borderRightWidth: 2, borderColor: CYAN,
  },

  // Runes
  runes: {
    fontSize: 13,
    color: CYAN,
    letterSpacing: 4,
    opacity: 0.6,
    position: 'absolute',
  },
  runesTop:    { top: 70 },
  runesBottom: { bottom: 70 },

  // Border lines
  borderLine: {
    fontSize: 14,
    color: GOLD,
    letterSpacing: 2,
    opacity: 0.5,
    position: 'absolute',
  },
  borderTop:    { top: 110 },
  borderBottom: { bottom: 110 },

  // Axes
  axeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 4,
  },
  axe: {
    fontSize: 22,
  },
  axeSpacer: {
    fontSize: 12,
    color: GOLD,
  },

  // Glow
  glowHalo: {
    position: 'absolute',
    fontSize: 180,
    fontWeight: '900',
    color: CYAN,
    textShadowColor: CYAN,
    textShadowRadius: 80,
    textShadowOffset: { width: 0, height: 0 },
    opacity: 0.12,
  },

  // Main A
  logoText: {
    fontSize: 140,
    fontWeight: '900',
    color: CYAN,
    textShadowColor: CYAN,
    textShadowRadius: 30,
    textShadowOffset: { width: 0, height: 0 },
    lineHeight: 155,
  },

  // Heartbeat line
  lineRow: {
    height: 4,
    marginVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 2,
    backgroundColor: CYAN,
    borderRadius: 1,
    shadowColor: CYAN,
    shadowRadius: 8,
    shadowOpacity: 1,
  },

  // Shields + title
  shieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  shield: {
    fontSize: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: WHITE,
    letterSpacing: 12,
    textShadowColor: CYAN,
    textShadowRadius: 18,
    textShadowOffset: { width: 0, height: 0 },
  },

  // Tagline
  tagline: {
    fontSize: 12,
    color: GOLD,
    letterSpacing: 4,
    fontStyle: 'italic',
  },
});
