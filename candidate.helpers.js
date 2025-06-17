function serializeCandidateInput(params) {
  const data = { ...params };

  if (data.school) data.school = String(data.school).toUpperCase();
  if (data.campus) data.campus = String(data.campus).toUpperCase();

  if (data.civility) {
    if (data.civility === "neutral") {
      data.sex = "N";
    } else {
      data.sex = data.civility === "MR" ? "M" : "F";
    }
  }

  return data;
}

async function validateIbanData({
  candidate_id,
  iban,
  bic,
  account_holder_name,
  first_name,
  last_name,
}) {
  const history = await IbanHistoryModel.create({
    candidate_id,
    iban,
    bic,
    account_holder_name,
    financial_support_first_name: first_name,
    financial_support_last_name: last_name,
  });

  try {
    await CandidateUtility.validateIbanBicCandidate(iban, bic);
    await IbanHistoryModel.updateOne(
      { _id: history._id },
      { $set: { message: "success" } }
    );
  } catch (error) {
    await IbanHistoryModel.updateOne(
      { _id: history._id },
      { $set: { message: error } }
    );

    throw new ApolloError(error);
  }
}

async function validateIbanForParents(parents, candidate_id) {
  if (!Array.isArray(parents)) return;
  for (const parent of parents) {
    if (parent.iban && parent.bic && parent.account_holder_name) {
      await validateIbanData({
        candidate_id,
        iban: parent.iban,
        bic: parent.bic,
        account_holder_name: parent.account_holder_name,
        first_name: parent.name,
        last_name: parent.family_name,
      });
    }
  }
}

async function validateIbanForStudent(candidate_input, candidate_id) {
  const { iban, bic, account_holder_name } = candidate_input;
  if (iban && bic && account_holder_name) {
    await validateIbanData({
      candidate_id,
      iban,
      bic,
      account_holder_name,
    });
  }
}

async function validateIbanForPaymentSupport(payment_support, candidate_id) {
    if (!Array.isArray(payment_support)) return;
    for(const support of payment_support){
        if(support.iban && support.bic && support.account_holder_name){
            await validateIbanData({
                candidate_id,
                iban: support.iban,
                bic: support.bic,
                account_holder_name: support.account_holder_name,
                first_name: support.name,
                last_name: support.family_name,
            })
        }
    }
}

module.exports = {
    serializeCandidateInput,
    validateIbanData,
    validateIbanForParents,
    validateIbanForStudent,
    validateIbanForPaymentSupport
}