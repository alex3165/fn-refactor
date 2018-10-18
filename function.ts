const mock = require("./data/mock-request-v2");

type EvaluationProps =
  | "openRate"
  | "clickRate"
  | "clickToOpenRate"
  | "phraseeScore";

interface SubjectLine {
  openRate: number;
  clickRate: number;
  clickToOpenRate: number;
  ownsl: boolean;
  numRecipients: number;
  phraseeScore?: number;
}

interface FedRequest {
  fullSplitMode: boolean;
  ccamp5DetermineWinner: EvaluationProps;
  subjectlines: SubjectLine[];
}

interface FedResponse {
  winner: "user" | "phrasee";
  userWiningSubjectline?: SubjectLine;
  phraseeWiningSubjectline?: SubjectLine;
  phraseeLowestSl?: SubjectLine;
  totalNumberSent: number;
  userLineExist: boolean;
  userHighestOpenRate: number;
  phraseeHighestOpenRate: number;
}

const getEvalProp = (req: FedRequest) =>
  req.fullSplitMode ? "openRate" : req.ccamp5DetermineWinner;

const getHighestSubjects = (subs: SubjectLine[], eval: EvaluationProps) => {
  const res = subs.sort((a, b) => (a[eval] < b[eval] ? 1 : -1));
  const sortedPhrasee = res.filter(x => !x.ownsl);
  const sortedUser = res.filter(x => x.ownsl);

  return {
    userHighestSubject: sortedUser.length > 0 ? sortedUser[0] : undefined,
    phraseeHighestSubject:
      sortedPhrasee.length > 0 ? sortedPhrasee[0] : undefined,
    phraseeLowerSubject:
      sortedPhrasee.length > 0
        ? sortedPhrasee[sortedPhrasee.length - 1]
        : undefined
    // winningSubject:
  };
};

const getTotal = (subs: SubjectLine[], prop: keyof SubjectLine) =>
  subs.reduce((acc, next) => acc + (next[prop] as number), 0);

const calculateWinningEmailSFMC = (req: FedRequest): FedResponse => {
  const evalProp = getEvalProp(req);
  const highestSubjects = getHighestSubjects(req.subjectlines, evalProp);

  // return {
  //   winner:
  // }
};
