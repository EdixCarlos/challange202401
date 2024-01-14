import database from '../database/mysqlConnection';

interface EmailDetails {
    emailTo: string;
    subject: string;
    message: string;
    sentAt: Date;
}

class EmailModel {
    async saveEmailDetails(emailDetails: EmailDetails): Promise<void> {
        try {
            const query = `
                INSERT INTO email_logs (emailTo, subject, message, sentAt)
                VALUES (?, ?, ?, ?)
            `;
            const { emailTo, subject, message, sentAt } = emailDetails;
            await database.execute(query, [emailTo, subject, message, sentAt]);
        } catch (error) {
            console.error('Error saving email details:', error);
        }
    }
}

export default new EmailModel();
