import { SubjectLine, Mode } from "./interfaces";

export const hasProp = (subs: SubjectLine[], prop: Mode) =>
  subs.filter(x => !!x[prop]).length === subs.length;

export const getTotal = (subs: SubjectLine[], prop: keyof SubjectLine) =>
  subs.reduce((acc, next) => acc + (next[prop] as number), 0);

export const getAverage = (subs: SubjectLine[], prop: keyof SubjectLine) =>
  parseFloat((getTotal(subs, prop) / subs.length).toFixed(2));
