const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema({
    reactionId:{
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },

    reactionBody: {
        type: String,
        required: 'Reaction Body is Required',
        maxlength: 280
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },

    username: {
        type: String,
        required: 'Username is Required'
    },
});

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'Thought Text is Required',
        minlength: 1,
        maxlength: 280
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },

    username: {
        type: String,
        required: 'Username is Required'
    },

    reactions: [ReactionSchema]
},
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
});

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
