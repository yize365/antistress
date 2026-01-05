
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    });
});

const utils = {
    getUrlParam: function(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    },
    
    setLocalStorage: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('本地存储错误:', e);
            return false;
        }
    },
    
    getLocalStorage: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('本地存储读取错误:', e);
            return null;
        }
    },
    
    clearLocalStorage: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('本地存储清除错误:', e);
            return false;
        }
    },
    
    sha256Hash: async function(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    },
    
    validateInvitationCode: async function(code) {
        const saltedInput = code.toUpperCase() + invitationConfig.salt;
        const inputHash = await this.sha256Hash(saltedInput);
        return invitationConfig.validCodeHashes.includes(inputHash);
    },
    
    generateInvitationCode: function(prefix = 'TES', length = 4) {
        const chars = '0123456789';
        let numbers = '';
        for (let i = 0; i < length; i++) {
            numbers += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return prefix + numbers;
    },
    
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    const invitationInput = document.getElementById('invitation-code');
    if (invitationInput) {
        invitationInput.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
        });
    }
});