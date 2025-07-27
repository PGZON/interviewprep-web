package com.interviewprep.app.exception;

public class HuggingFaceException extends RuntimeException {

    public static final String TOKEN_EXHAUSTED = "API token has been exhausted or is invalid";
    public static final String MODEL_TIMEOUT = "The model request timed out";
    public static final String INVALID_PROMPT = "Invalid prompt structure";
    public static final String PARSING_ERROR = "Error parsing the response from Hugging Face";

    public HuggingFaceException(String message) {
        super(message);
    }

    public HuggingFaceException(String message, Throwable cause) {
        super(message, cause);
    }
}
