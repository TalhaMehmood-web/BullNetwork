class ApiResponse {
    constructor(statusCode, data, message = "Success", token) {
        this.data = data
        this.statusCode = statusCode
        this.message = message
        this.success = statusCode < 400
        this.token = token

    }
}

export default ApiResponse 