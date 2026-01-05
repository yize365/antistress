// 通用功能函数

// 阻止表单默认提交
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    });
});

// 通用工具函数
const utils = {
    // 获取URL参数
    getUrlParam: function(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    },
    
    // 设置本地存储
    setLocalStorage: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('本地存储错误:', e);
            return false;
        }
    },
    
    // 获取本地存储
    getLocalStorage: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('本地存储读取错误:', e);
            return null;
        }
    },
    
    // 清除本地存储
    clearLocalStorage: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('本地存储清除错误:', e);
            return false;
        }
    },
    
    // SHA-256 加密函数
    sha256Hash: async function(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    },
    
    // 验证邀请码
    validateInvitationCode: async function(code) {
        const saltedInput = code.toUpperCase() + invitationConfig.salt;
        const inputHash = await this.sha256Hash(saltedInput);
        return invitationConfig.validCodeHashes.includes(inputHash);
    },
    
    // 生成随机邀请码（备用功能）
    generateInvitationCode: function(prefix = 'TES', length = 4) {
        const chars = '0123456789';
        let numbers = '';
        for (let i = 0; i < length; i++) {
            numbers += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return prefix + numbers;
    },
    
    // 防抖函数
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

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 为所有按钮添加点击效果
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // 为输入框添加焦点效果
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // 自动将输入的邀请码转换为大写
    const invitationInput = document.getElementById('invitation-code');
    if (invitationInput) {
        invitationInput.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
        });
    }
});