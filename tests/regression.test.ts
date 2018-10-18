const mockv1 = require("../data/mock-response");
const main = require("../function");

import { mock } from "../data/mock-request-v2";
import { calculateWinningEmailSFMC } from "../src/function";

const normalizeForAssert = (subj: any) =>
  JSON.stringify(subj)
    .replace(/(_)/g, "")
    .toLowerCase();

describe("Regression tests", () => {
  it("should return the same winner type", () => {
    const resv1 = main.calculateWinningEmailSFMC(mockv1);
    const resv2 = calculateWinningEmailSFMC(mock);

    expect(resv1.winner).toEqual(resv2.winner);
  });

  it("should return the same user winner SL", () => {
    const resv1 = main.calculateWinningEmailSFMC(mockv1);
    const resv2 = calculateWinningEmailSFMC(mock);

    expect(normalizeForAssert(resv1.userWiningSubjectline)).toEqual(
      normalizeForAssert(resv2.userWiningSubjectline)
    );
  });

  it("should return the same phrasee winner SL", () => {
    const resv1 = main.calculateWinningEmailSFMC(mockv1);
    const resv2 = calculateWinningEmailSFMC(mock);

    expect(normalizeForAssert(resv1.phraseeWiningSubjectline)).toEqual(
      normalizeForAssert(resv2.phraseeWiningSubjectline)
    );
  });

  it("should return the same phrasee lowest SL", () => {
    const resv1 = main.calculateWinningEmailSFMC(mockv1);
    const resv2 = calculateWinningEmailSFMC(mock);

    expect(normalizeForAssert(resv1.phrasee_lowest_sl)).toEqual(
      normalizeForAssert(resv2.phraseeLowestSl)
    );
  });

  it("should return the same average open rate", () => {
    const resv1 = main.calculateWinningEmailSFMC(mockv1);
    const resv2 = calculateWinningEmailSFMC(mock);

    expect(parseFloat(resv1.avg_open_rate)).toEqual(resv2.AvgOpenRate);
  });

  it("should return the same highest open rate", () => {
    const resv1 = main.calculateWinningEmailSFMC(mockv1);
    const resv2 = calculateWinningEmailSFMC(mock);

    expect(parseFloat(resv1.highest_open_rate)).toEqual(resv2.highestOpenRate);
  });

  it("should return the same winner click rate", () => {
    const resv1 = main.calculateWinningEmailSFMC(mockv1);
    const resv2 = calculateWinningEmailSFMC(mock);

    expect(parseFloat(resv1.winner_click_rate)).toEqual(
      resv2.winningSubject.clickRate
    );
  });

  it("should return the same total numbers", () => {
    const resv1 = main.calculateWinningEmailSFMC(mockv1);
    const resv2 = calculateWinningEmailSFMC(mock);

    expect(parseFloat(resv1.totalNumberSent)).toEqual(resv2.totalNumberSent);
  });

  it("should return the same highest user open rate", () => {
    const resv1 = main.calculateWinningEmailSFMC(mockv1);
    const resv2 = calculateWinningEmailSFMC(mock);

    expect(parseFloat(resv1.user_highest_open_rate)).toEqual(
      resv2.userHighestOpenRate
    );
  });
});
