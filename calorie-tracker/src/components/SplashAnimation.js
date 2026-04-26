import React, { useEffect, useRef } from 'react';
import {
  View, Text, Animated, Easing, StyleSheet, Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const BG      = '#080C14';
const CYAN    = '#00D4D8';
const GOLD    = '#C9A84C';
const RUNE_T  = 'ᚠ  ᚢ  ᚦ  ᚨ  ᚱ  ᚲ  ᚷ  ᚹ  ᚺ';
const RUNE_B  = 'ᚾ  ᛁ  ᛃ  ᛇ  ᛈ  ᛉ  ᛊ  ᛏ  ᛒ';

export default function SplashAnimation({ onFinish }) {
  const runesOp   = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOp    = useRef(new Animated.Value(0)).current;
  const glowOp    = useRef(new Animated.Value(0.2)).current;
  const lineW     = useRef(new Animated.Value(0)).current;
  const titleOp   = useRef(new Animated.Value(0)).current;
  const titleY    = useRef(new Animated.Value(40)).current;
  const tagOp     = useRef(new Animated.Value(0)).current;
  const borderOp  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowOp, { toValue: 1,   duration: 900, useNativeDriver: true }),
        Animated.timing(glowOp, { toValue: 0.2, duration: 900, useNativeDriver: true }),
      ])
    );

    Animated.sequence([
      // Phase 1 — runes & border frame appear
      Animated.parallel([
        Animated.timing(runesOp,  { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(borderOp, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),

      // Phase 2 — A scales in from darkness
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 750,
          easing: Easing.out(Easing.back(1.3)),
          useNativeDriver: true,
        }),
        Animated.timing(logoOp, { toValue: 1, duration: 750, useNativeDriver: true }),
      ]),

      // Phase 3 — heartbeat line draws across
      Animated.timing(lineW, { toValue: 1, duration: 550, useNativeDriver: false }),

      // Phase 4 — ANZHU slides up
      Animated.parallel([
        Animated.timing(titleOp, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(titleY,  {
          toValue: 0, duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),

      // Phase 5 — tagline fades in
      Animated.timing(tagOp, { toValue: 1, duration: 450, useNativeDriver: true }),

      // Phase 6 — hold
      Animated.delay(900),
    ]).start(() => {
      glowLoop.stop();
      onFinish?.();
    });

    // Start glow loop after A appears (~1350ms)
    const glowTimer = setTimeout(() => glowLoop.start(), 1350);
    return () => {
      clearTimeout(glowTimer);
      glowLoop.stop();
    };
  }, []);

  const lineWidthInterp = lineW.interpolate({
    inputRange:  [0, 1],
    outputRange: [0, width * 0.55],
  });

  return (
    <View style={styles.container}>

      {/* Corner decorations */}
      <Animated.View style={[styles.cornerTL, { opacity: borderOp }]} />
      <Animated.View style={[styles.cornerTR, { opacity: borderOp }]} />
      <Animated.View style={[styles.cornerBL, { opacity: borderOp }]} />
      <Animated.View style={[styles.cornerBR, { opacity: borderOp }]} />

      {/* Top runes */}
      <Animated.Text style={[styles.runes, styles.runesTop, { opacity: runesOp }]}>
        {RUNE_T}
      </Animated.Text>

      {/* Glow halo behind A */}
      <Animated.Text style={[styles.glowHalo, { opacity: glowOp }]}>
        A
      </Animated.Text>

      {/* Main A */}
      <Animated.Text style={[
        styles.logoText,
        { opacity: logoOp, transform: [{ scale: logoScale }] },
      ]}>
        A
      </Animated.Text>

      {/* Heartbeat line */}
      <View style={styles.lineRow}>
        <Animated.View style={[styles.line, { width: lineWidthInterp }]}>
          <View style={styles.lineGlow} />
        </Animated.View>
      </View>

      {/* ANZHU title */}
      <Animated.View style={{
        opacity: titleOp,
        transform: [{ translateY: titleY }],
        alignItems: 'center',
      }}>
        <Text style={styles.title}>ANZHU</Text>
      </Animated.View>

      {/* Tagline */}
      <Animated.Text style={[styles.tagline, { opacity: tagOp }]}>
        ⚔  Fight Every Day  ⚔
      </Animated.Text>

      {/* Bottom runes */}
      <Animated.Text style={[styles.runes, styles.runesBottom, { opacity: runesOp }]}>
        {RUNE_B}
      </Animated.Text>

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

  // Corner brackets
  cornerTL: {
    position: 'absolute', top: 40, left: 30,
    width: 30, height: 30,
    borderTopWidth: 2, borderLeftWidth: 2,
    borderColor: CYAN,
  },
  cornerTR: {
    position: 'absolute', top: 40, right: 30,
    width: 30, height: 30,
    borderTopWidth: 2, borderRightWidth: 2,
    borderColor: CYAN,
  },
  cornerBL: {
    position: 'absolute', bottom: 40, left: 30,
    width: 30, height: 30,
    borderBottomWidth: 2, borderLeftWidth: 2,
    borderColor: CYAN,
  },
  cornerBR: {
    position: 'absolute', bottom: 40, right: 30,
    width: 30, height: 30,
    borderBottomWidth: 2, borderRightWidth: 2,
    borderColor: CYAN,
  },

  // Runes
  runes: {
    fontSize: 15,
    color: CYAN,
    letterSpacing: 5,
    opacity: 0.55,
    position: 'absolute',
  },
  runesTop:    { top: 80 },
  runesBottom: { bottom: 80 },

  // Glow halo (blurred A behind)
  glowHalo: {
    position: 'absolute',
    fontSize: 160,
    fontWeight: '900',
    color: CYAN,
    textShadowColor: CYAN,
    textShadowRadius: 60,
    textShadowOffset: { width: 0, height: 0 },
    opacity: 0.15,
  },

  // Main A
  logoText: {
    fontSize: 140,
    fontWeight: '900',
    color: CYAN,
    textShadowColor: CYAN,
    textShadowRadius: 25,
    textShadowOffset: { width: 0, height: 0 },
    lineHeight: 160,
  },

  // Heartbeat line
  lineRow: {
    height: 4,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 2,
    backgroundColor: CYAN,
    borderRadius: 1,
  },
  lineGlow: {
    position: 'absolute',
    top: -3, left: 0, right: 0, bottom: -3,
    backgroundColor: CYAN,
    opacity: 0.3,
    borderRadius: 4,
  },

  // Title
  title: {
    fontSize: 38,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 14,
    textShadowColor: CYAN,
    textShadowRadius: 15,
    textShadowOffset: { width: 0, height: 0 },
  },

  // Tagline
  tagline: {
    fontSize: 13,
    color: GOLD,
    letterSpacing: 4,
    marginTop: 12,
    fontStyle: 'italic',
  },
});
