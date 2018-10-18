export enum ModeType {
  openRate = "openRate",
  clickRate = "clickRate",
  clickToOpenRate = "clickToOpenRate",
  phraseeScore = "phraseeScore"
}

export type Mode =
  | "openRate"
  | "clickRate"
  | "clickToOpenRate"
  | "phraseeScore";

export interface SubjectLine {
  _id?: string;
  text?: string;
  openRate: number;
  clickRate: number;
  clickToOpenRate: number;
  ownsl: boolean;
  numRecipients: number;
  phraseeScore?: number;
}

export interface FedRequest {
  fullSplitMode: boolean;
  ccamp5DetermineWinner: Mode;
  subjects: SubjectLine[];
}

export interface FedResponse {
  winner: "user" | "phrasee";
  winningSubject: SubjectLine;
  userWiningSubjectline?: SubjectLine;
  phraseeWiningSubjectline?: SubjectLine;
  phraseeLowestSl?: SubjectLine;
  totalNumberSent: number;
  userLineExist: boolean;
  userHighestOpenRate: number;
  phraseeHighestOpenRate: number;
  createdAt: Date;

  AvgOpenRate: number;
  AvgClickRate: number;
  AvgClickToOpenRate: number;
  AvgPhraseeScore: number;

  highestOpenRate: number;
  highestClickRate: number;
  highestClickToOpenRate: number;
  highestPhraseeScore: number;
}
