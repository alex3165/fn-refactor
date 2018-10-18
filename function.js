module.exports = {
  calculateWinningEmailSFMC: function(req) {
    console.log(req);
    let previousCount = 0;
    let winningIndex = 0;

    let numValidSl = 0;
    let totalopened = 0;
    let totalclicked = 0;
    let totalclicktopopen = 0;
    let totalphrasee = 0;

    let highestopened = 0;
    let highestclicked = 0;
    let highestclicktopopen = 0;
    let highestphrasee = 10;

    let userHighestOpenRate = -1;
    let phraseeHighestOpenRate = -1;
    let userHighestRate = 0;
    let phraseeHighestRate = 0;
    let phraseeLowestRate = 100;
    let phrasee_lowest_sl = {};
    let userWiningSubjectline = {};
    let phraseeWiningSubjectline = {};
    let userLineExist = false;
    let totalNumberSent = 0;

    if (req.subjectlines.length > 0) {
      for (let i = 0; i < req.subjectlines.length; i++) {
        numValidSl++;
        let curSl = req.subjectlines[i];

        // let determineWinner = "";
        // if (req.full_split_mode) {
        //   determineWinner = "openrate";
        // } else {
        //   determineWinner = req.ccamp5_determine_winner.trim();
        //   req.ccamp5_determine_winner = determineWinner;
        // }

        // totalNumberSent += curSl.num_recipients;

        // if (userHighestOpenRate < curSl.open_rate && curSl.ownsl) {
        //   userHighestOpenRate = curSl.open_rate;
        // } else if (phraseeHighestOpenRate < curSl.open_rate && !curSl.ownsl) {
        //   phraseeHighestOpenRate = curSl.open_rate;
        // }

        // switch (determineWinner) {
        //   case "openrate":
        //     let currentOpenRate = curSl.open_rate;

        //     if (userHighestRate < currentOpenRate && curSl.ownsl) {
        //       userHighestRate = currentOpenRate;
        //       userLineExist = true;
        //       userWiningSubjectline = curSl;
        //     } else if (phraseeHighestRate < currentOpenRate && !curSl.ownsl) {
        //       phraseeHighestRate = currentOpenRate;
        //       phraseeWiningSubjectline = curSl;
        //     }

        //     if (currentOpenRate < phraseeLowestRate && !curSl.ownsl) {
        //       phrasee_lowest_sl = curSl;
        //       phraseeLowestRate = currentOpenRate;
        //     }

        //     if (previousCount < currentOpenRate) {
        //       winningIndex = i;
        //       previousCount = currentOpenRate;
        //     }
        //     break;
        //   case "clickrate":
        //     let currentClickRate = curSl.click_rate;

        //     if (userHighestRate < currentClickRate && curSl.ownsl) {
        //       userHighestRate = currentClickRate;
        //       userLineExist = true;
        //       userWiningSubjectline = curSl;
        //     } else if (phraseeHighestRate < currentClickRate && !curSl.ownsl) {
        //       phraseeHighestRate = currentClickRate;
        //       phraseeWiningSubjectline = curSl;
        //     }

        //     if (currentClickRate < phraseeLowestRate && !curSl.ownsl) {
        //       phrasee_lowest_sl = curSl;
        //       phraseeLowestRate = currentClickRate;
        //     }

        //     if (previousCount < currentClickRate) {
        //       winningIndex = i;
        //       previousCount = currentClickRate;
        //     }
        //     break;
        //   case "clicktoopenrate":
        //     let currentClickToOpenRate = curSl.clicktoopen_rate;

        //     if (userHighestRate < currentClickToOpenRate && curSl.ownsl) {
        //       userHighestRate = currentClickToOpenRate;
        //       userLineExist = true;
        //       userWiningSubjectline = curSl;
        //     } else if (phraseeHighestRate < currentClickToOpenRate && !curSl.ownsl) {
        //       phraseeHighestRate = currentClickToOpenRate;
        //       phraseeWiningSubjectline = curSl;
        //     }

        //     if (currentClickToOpenRate < phraseeLowestRate && !curSl.ownsl) {
        //       phrasee_lowest_sl = curSl;
        //       phraseeLowestRate = currentClickToOpenRate;
        //     }

        //     if (previousCount < currentClickToOpenRate) {
        //       winningIndex = i;
        //       previousCount = currentClickToOpenRate;
        //     }
        //     break;
        //   default:
        //     let currentPhraseeScore = curSl.phrasee_score;

        //     if (userHighestRate < currentPhraseeScore && curSl.ownsl) {
        //       userHighestRate = currentPhraseeScore;
        //       userLineExist = true;
        //       userWiningSubjectline = curSl;
        //     } else if (phraseeHighestRate < currentPhraseeScore && !curSl.ownsl) {
        //       phraseeHighestRate = currentPhraseeScore;
        //       phraseeWiningSubjectline = curSl;
        //     }

        //     if (currentPhraseeScore < phraseeLowestRate && !curSl.ownsl) {
        //       phrasee_lowest_sl = curSl;
        //       phraseeLowestRate = currentPhraseeScore;
        //     }

        //     if (previousCount > currentPhraseeScore) {
        //       winningIndex = i;
        //       previousCount = currentPhraseeScore;
        //     }
        // }

        totalopened += parseFloat(curSl.open_rate) || 0;
        totalclicked += parseFloat(curSl.click_rate) || 0;
        totalclicktopopen += parseFloat(curSl.clicktoopen_rate) || 0;
        totalphrasee += parseFloat(curSl.phrasee_score) || 1;

        let openRate = curSl.open_rate || 0;
        if (openRate > highestopened) {
          highestopened = openRate;
        }

        let clickRate = curSl.click_rate || 0;
        if (clickRate > highestclicked) {
          highestclicked = clickRate;
        }

        let clicktoopenRate = curSl.clicktoopen_rate || 0;
        if (clicktoopenRate > highestclicktopopen) {
          highestclicktopopen = clicktoopenRate;
        }

        let phraseeScore = curSl.phrasee_score || 1;
        if (phraseeScore < highestphrasee) {
          highestphrasee = phraseeScore;
        }
      }
    }

    let winningSL = req.subjectlines[winningIndex];

    if (!req.full_split_mode) {
      req.winning_index = winningIndex;
      req.winning_sl_id = winningSL._id;
      if (typeof winningSL.text !== "undefined") {
        req.winning_subject = winningSL.text;
      }
    }

    // Update subjectline Winning field in campaign collection for phrasee step 4 charts...
    // req.winner = winningSL.ownsl ? "user" : "phrasee";
    req.user_highest_open_rate = userHighestOpenRate;
    req.phrasee_highest_open_rate = phraseeHighestOpenRate;
    // req.userWiningSubjectline = userWiningSubjectline;
    // req.phraseeWiningSubjectline = phraseeWiningSubjectline;
    // req.phrasee_lowest_sl = phrasee_lowest_sl;
    // req.totalNumberSent = totalNumberSent;
    // req.userLineExist = userLineExist;

    req.input_results_at = new Date();
    let date = new Date();
    date.setDate(date.getDate() + 4);
    req.final_results_at = date;
    req.final_results_updated = 0;

    req.winner_open_rate =
      winningSL.open_rate || winningSL.open_rate === 0
        ? winningSL.open_rate.toFixed(2)
        : null;
    req.winner_click_rate =
      winningSL.click_rate || winningSL.click_rate === 0
        ? winningSL.click_rate.toFixed(2)
        : null;
    req.winner_clicktoopen_rate =
      winningSL.clicktoopen_rate || winningSL.clicktoopen_rate === 0
        ? winningSL.clicktoopen_rate.toFixed(2)
        : null;
    req.winner_phrasee_score =
      winningSL.phrasee_score || winningSL.phrasee_score === 0
        ? winningSL.phrasee_score.toFixed(2)
        : null;

    req.avg_open_rate = (totalopened / numValidSl).toFixed(2);
    req.avg_click_rate = (totalclicked / numValidSl).toFixed(2);
    req.avg_clicktoopen_rate = (totalclicktopopen / numValidSl).toFixed(2);
    req.avg_phrasee_score = (totalphrasee / numValidSl).toFixed(2);

    req.highest_open_rate = highestopened.toFixed(2);
    req.highest_click_rate = highestclicked.toFixed(2);
    req.highest_clicktoopen_rate = highestclicktopopen.toFixed(2);
    req.highest_phrasee_score = highestphrasee.toFixed(2);

    return req;
  }
};
