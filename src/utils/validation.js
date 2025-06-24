// utils/validation.js
/**
 * 驗證手機號碼格式
 * @param {string} phone - 手機號碼
 * @returns {boolean} - 是否合法
 */
export function isValidPhone(phone) {
  return /^[0-9]{10}$/.test(phone);
}

/**
 * 檢查密碼強度
 * @param {string} password - 密碼
 * @returns {number} - 強度等級 (0-5)
 */
export function checkPasswordStrength(password) {
  if (!password) return 0;

  let strength = 0;

  // 長度檢查
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;

  // 複雜性檢查
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  return Math.min(strength, 5);
}

/**
 * 產生密碼強度規則
 * @param {string} oldPassword - 舊密碼（可選）
 * @returns {Array} - 驗證規則陣列
 */
export function getPasswordRules(oldPassword = null) {
  const rules = [
    (v) => !!v || "請輸入密碼",
    (v) => v.length >= 8 || "密碼至少需要8位字元",
    (v) => !/\s/.test(v) || "密碼不能包含空格",
    (v) => /[A-Z]/.test(v) || "密碼需包含至少一個大寫字母",
    (v) => /[a-z]/.test(v) || "密碼需包含至少一個小寫字母",
    (v) => /[0-9]/.test(v) || "密碼需包含至少一個數字",
  ];

  if (oldPassword) {
    rules.push((v) => v !== oldPassword || "新密碼不能與舊密碼相同");
  }

  return rules;
}
