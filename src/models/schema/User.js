let User

const m = (builder, Mongoose) => {
  User = builder.model('User', new Mongoose.Schema({
    ID: { type: Number, required: true },
    // firstName: { type: String },
    // lastName: { type: String },
    // firstNameFurigana: { type: String },
    // lastNameFurigana: { type: String },
    email: { type: String },
    isAdmin: { type: Boolean, default: false },
    username: { type: String, required: true },
    password: { type: String, required: true, select: false }
    // publicAddress: { type: String },
    // privateKey: { type: String, select: false },
    // blueCoinReceivedInMonth: { type: Number, default: 0 },
    // blueCoinAccumulated: { type: Number, default: 0 },
    // positionId: { type: mongoose.Schema.ObjectId, ref: 'Position' },
    // createdAt: { type: Date, required: true, default: Date.now },
    // modifiedAt: { type: Date, required: true, default: Date.now }
  }))
}

export { User, m }
