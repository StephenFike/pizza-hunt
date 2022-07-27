const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReplySchema = new Schema({
    replyId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    replyBody: {
        type: String,
        required: 'You must enter a reply!',
        trim: true
    },
    writtenBy: {
        type: String,
        required: 'You must enter your name!',
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
        getters: true
    }
}
)

const CommentSchema = new Schema({
        writtenBy: {
            type: String,
            required: 'You must enter your name!',
            trim: true
        },
        commentBody: {
            type: String,
            required: 'You must enter a comment!',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        replies: [ReplySchema]
    },
    {
        toJson: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);


CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;