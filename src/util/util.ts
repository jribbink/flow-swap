import config from "config";
import { SwapPair } from "models/swap-pair";
import { Token } from "models/token";

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
 export function isObject(item: any) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target: any, ...sources: any[]): any {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

export function round (value: number, precision: number) {
  return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision)
}

export function findPair(tokenA?: Token, tokenB?: Token): SwapPair | undefined {
  if(!tokenA || !tokenB) return undefined

  return config.pairs.find(pair => 
      (tokenA?.equals(pair.tokenA) && tokenB?.equals(pair.tokenB)) ||
      (tokenA?.equals(pair.tokenB) && tokenB?.equals(pair.tokenA))
  )
}

export function numberToPercent(value: number) {
  return `${value > 0.01 ? (round(value, 4) * 100).toFixed(2) : '<0.01'}%`
}