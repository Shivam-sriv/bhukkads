export const validateField = (name, value) => {
    let error = '';

    if (name == "mobileNo" || name == "phoneNo" || name == "mobile" || name == "phone" || name == "userMobile" || name == "userPhone") {
        const mobilePattern = /^[0-9]{10}$/;
        if (!value?.trim()) {
            error = `${formatString(name)} is required`;
        } else if (!mobilePattern.test(value)) {
            error = `${formatString(name)} is invalid`;
        } else if (value.length !== 10) {
            error = `${formatString(name)} should be 10 digit`;
        }
    } else if (name == "email" || name == "emailId" || name == "userEmail") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value?.trim()) {
            error = `${formatString(name)} is required`;
        } else if (!emailPattern.test(value)) {
            error = `${formatString(name)} is invalid`;
        } else if (value.length > 100) {
            error = `${formatString(name)} should be less than 100 digit`;
        }
    }
    else if (name == "password" || name == "Password" || name == "PASSWORD" || name == "userPassword") {
        if (!value?.trim()) {
            error = `${formatString(name)} is required`;
        } else if (value.length < 6) {
            error = `${formatString(name)} is required must be at least 6 characters`;
        }
    }
    else if (name == "pan" || name == "Pan" || name == "PAN" || name == "panNo" || name == "panNumber" || name == "userPan" || name == "guardianPan") {
        const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!value?.trim()) {
            error = `${formatString(name)} is required`;
        } else if (!panPattern.test(value)) {
            error = `${formatString(name)} is invalid`;
        } else if (value?.length !== 10) {
            error = `${formatString(name)} should be 10 digit`;
        }
    }
    else if (name == "aadhaar" || name == "aadhaarNo" || name == "aadhaarNumber" || name == "aadharNo") {
        const aadhaarPattern = /^[2-9]{1}[0-9]{11}$/;
        if (!value?.trim()) {
            error = `${formatString(name)} is required`;
        } else if (!aadhaarPattern.test(value)) {
            error = `${formatString(name)} is invalid`;
        } else if (value?.length !== 12) {
            error = `${formatString(name)} should be 12 digit`;
        }
    }
    else if (name == "image" || name == "file" || name == "profilePic" || name == "idProof" || name == "proof") {
        if (!value) {
            error = `${formatString(name)} is required`;
        } else if (value.size > 1048576) { // 1MB file size limit
            error = `${formatString(name)} size must be less than 1MB`;
        } else if (!['image/jpeg', 'image/png', 'image/jpg', "image/webp" ,'application/pdf'].includes(value.type)) {
            error = 'File type must be JPEG, PNG, or PDF';
        }
    }
     else if (!value) {
        error = `${formatString(name)} is required`;
    }
    return error;
};
export const validate = (formData) => {
    let newErrors = {}
    Object.keys(formData).forEach((key) => {
        const error = validateField(key, formData[key]);
        if (error) {
            newErrors[key] = error;
        }
    });
    if (Object.keys(newErrors).length === 0) {
        return { error: null, isError: false }
    } else {
        return { error: newErrors, isError: true }
    }
}


function formatString(str) {
    if (!str) return str;

    // Capitalize the first letter
    let formattedStr = str.charAt(0).toUpperCase() + str.slice(1);

    // Add space before each capital letter (except the first one)
    formattedStr = formattedStr.replace(/([A-Z])/g, ' $1').trim();

    return formattedStr;
}
