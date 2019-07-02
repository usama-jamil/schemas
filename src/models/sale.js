const mongoose = require("mongoose");
const validator = require("validator");

const saleSchema = new mongoose.Schema(
  {
    FullName: {
      type: String,
      required: true,
      trim: true
    },
    ContactNumber: {
      type: String,
      required: true,
      trim: true,
      validate(value){
        if(validator.isNumeric(value)){
            throw new Error('You must enter valid contact number')
        }
    }
    },
    Time: { type: String, default: new Date().toLocaleTimeString() },
    Status: {
      type: String,
      enum: ["CallBack", "Transfer", "Pending"],
      default: "Pending"
    },
    KickBack: "",
    State: String,
    City: String,
    ZipCode: Number,
    Email: String,
    MotherMediansName: String,
    SocialSecurityNumber: String,
    Notes: String,

    SecurityWord: String,
    HighestLevelofEducation: {
      type: String,
      enum: [
        "Less than a high school diploma",
        "High school diploma or GED",
        "Some college or associate degree",
        "Bachelor's Degree",
        "Advanced/Graduate Degree"
      ]
    },
    EmploymentStatus: {
      type: String,
      enum: [
        "Employed Full-Time",
        "Employed Part-Time",
        "Self-Employed",
        "Unemployed",
        "Retired",
        "Other",
        "College Student"
      ]
    },
    HousingStatus: {
      type: String,
      enum: ["Own Home", "Rent", "Other"]
    },
    Company: String,
    Designation: String,
    Annualincome: Number,
    ChequinAccounts: {
      type: String,
      enum: ["Chequin", "Saving", "Chequin-Saving", "None"]
    },
    OtherLoans: {
      type: String,
      enum: ["Loan", "Mortgages", "Loan-Mortgages", "Other"]
    },
    MonthlyRentMortgage: { type: Number  }
  },
  { timestamps: true }
);

saleSchema.methods.getPublicSale = function(){
  const saleObject = this.toObject()

  delete saleObject

  return saleObject
}

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
