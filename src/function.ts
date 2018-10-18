import { hasProp, getTotal, getAverage } from "./utils";
import {
  SubjectLine,
  Mode,
  FedRequest,
  FedResponse,
  ModeType
} from "./interfaces";

// Selectors (business logic)
const getMode = (fullSplitMode: boolean, ccamp5DetermineWinner: Mode) =>
  fullSplitMode ? ModeType.openRate : ccamp5DetermineWinner;

const getSortedSubjects = (subs: SubjectLine[], prop: Mode) =>
  ([] as SubjectLine[])
    .concat(subs)
    .sort((a, b) => (a[prop]! < b[prop]! ? 1 : -1));

const getHighestNumberFromProp = (subs: SubjectLine[], prop: Mode) => {
  const highestSubjProp = getSortedSubjects(subs, prop)[0][prop];
  return highestSubjProp ? parseFloat(highestSubjProp.toFixed(2)) : 0;
};

const getSubjects = (subs: SubjectLine[], prop: Mode) => {
  const res = getSortedSubjects(subs, prop);
  const sortedPhrasee = res.filter(x => !x.ownsl);
  const sortedUser = res.filter(x => x.ownsl);

  return {
    userHighest: sortedUser.length > 0 ? sortedUser[0] : undefined,
    phraseeHighest: sortedPhrasee.length > 0 ? sortedPhrasee[0] : undefined,
    phraseeLower:
      sortedPhrasee.length > 0
        ? sortedPhrasee[sortedPhrasee.length - 1]
        : undefined,
    winning: res[0]
  };
};

// Main
export const calculateWinningEmailSFMC = (req: FedRequest): FedResponse => {
  const { fullSplitMode, ccamp5DetermineWinner, subjects } = req;
  const { winning, userHighest, phraseeHighest, phraseeLower } = getSubjects(
    subjects,
    getMode(fullSplitMode, ccamp5DetermineWinner)
  );

  const openRateSubjects = getSubjects(subjects, ModeType.openRate);
  const hasPhraseeScore = hasProp(subjects, ModeType.phraseeScore);

  return {
    // Uncomment if needed to return the request payload (but I don't think it is a good idea)
    // ...req,

    // Winning type and SubjectLine
    winner: winning.ownsl ? "user" : "phrasee",
    winningSubject: winning,

    // Winning user / Phrasee SubjectLine
    userWiningSubjectline: userHighest,
    phraseeWiningSubjectline: phraseeHighest,

    // Don't we need user lowest subject too?
    phraseeLowestSl: phraseeLower,

    totalNumberSent: getTotal(subjects, "numRecipients"),
    userLineExist: !!userHighest,

    // Do we need this ?
    userHighestOpenRate: openRateSubjects.userHighest
      ? openRateSubjects.userHighest.openRate
      : 0,
    phraseeHighestOpenRate: openRateSubjects.phraseeHighest
      ? openRateSubjects.phraseeHighest.openRate
      : 0,

    // Created at date
    createdAt: new Date(),

    // Average
    AvgOpenRate: getAverage(subjects, ModeType.openRate),
    AvgClickRate: getAverage(subjects, ModeType.clickRate),
    AvgClickToOpenRate: getAverage(subjects, ModeType.clickToOpenRate),
    AvgPhraseeScore: hasPhraseeScore
      ? getAverage(subjects, ModeType.phraseeScore)
      : 0,

    // Highest
    highestOpenRate: openRateSubjects.winning.openRate,
    highestClickRate: getHighestNumberFromProp(subjects, ModeType.clickRate),
    highestClickToOpenRate: getHighestNumberFromProp(
      subjects,
      ModeType.clickToOpenRate
    ),
    highestPhraseeScore: hasPhraseeScore
      ? getHighestNumberFromProp(subjects, ModeType.phraseeScore)
      : 0
  };
};
