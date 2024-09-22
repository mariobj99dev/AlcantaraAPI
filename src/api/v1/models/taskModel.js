// src/api/v1/models/taskModel.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const taskSchema = new Schema({
    title: { type: String, required: true },
    status: { type: String, required: true },
    branch: { type: String, required: true },
    description: { type: String },
    workers: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Referencia a usuarios
    tasks: [{ type: String }],
    created_at: { type: Date, default: Date.now },
    due_date: {
        type: String,
        validate: {
            validator: function (value) {
                return value === 'infinite' || !isNaN(Date.parse(value));
            },
            message: 'due_date debe ser una fecha válida o "infinite"'
        },
        required: true
    },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
    assigned_by: { type: Schema.Types.ObjectId, ref: 'User', required: true } // Referencia a usuario
});

const Task = model('Task', taskSchema);

export default Task;
