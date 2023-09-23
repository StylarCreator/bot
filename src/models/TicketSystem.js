const { model, Schema } = require('mongoose');

module.exports = model('ticketsystem', new Schema({
    Guild: String,
    Channel: String,
    MessageID: String,
    StaffRoleID: String,
}))