// Prefix variants used by the coordinator; preserve the original body for hashing/receipts.
export const coordinatorComment = comment => comment.user?.login === "edsaperia"
  && /^COORDINATOR(?::|[ \t]+[—–-](?=\s|$))/m.test(comment.body ?? "");
