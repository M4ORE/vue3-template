import { format } from "date-fns";
import { zhTW } from "date-fns/locale";

/**
 * 驗證日期時間字符串是否有效
 * @param {string} dateTime - ISO格式的日期時間字符串 (YYYY-MM-DDTHH:mm:ss)
 * @returns {boolean} 是否有效
 */
export const isValidDateTime = (dateTime) => {
  // 1. 檢查是否為字符串類型
  if (typeof dateTime !== "string") {
    return false;
  }

  // 2. 檢查基本格式是否符合 YYYY-MM-DDTHH:mm:ss
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
  if (!regex.test(dateTime)) {
    return false;
  }

  try {
    // 3. 解析日期和時間部分
    const [datePart, timePart] = dateTime.split("T");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hours, minutes, seconds] = timePart.split(":").map(Number);

    // 4. 檢查日期值的範圍
    if (year < 1000 || year > 9999) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;

    // 5. 檢查時間值的範圍
    if (hours < 0 || hours > 23) return false;
    if (minutes < 0 || minutes > 59) return false;
    if (seconds < 0 || seconds > 59) return false;

    // 6. 使用 Date 對象進行最終驗證
    const date = new Date(dateTime);
    if (isNaN(date.getTime())) {
      return false;
    }

    // 7. 檢查月份的天數是否有效
    const originalMonth = date.getMonth() + 1;
    if (originalMonth !== month) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error validating date time:", error);
    return false;
  }
};

/**
 * 格式化日期時間字符串
 * @param {string} dateTime - ISO格式的日期時間字符串
 * @returns {string} 格式化後的日期時間字符串
 */
export const formatDateTime = (dateTime) => {
  if (!dateTime) return "";

  try {
    const [date, time] = dateTime.split("T");
    return `${format(new Date(date), "yyyy/MM/dd", {
      locale: zhTW,
    })} ${time.slice(0, 5)}`;
  } catch (error) {
    console.error("Error formatting date time:", error);
    return "";
  }
};

/**
 * 將日期和時間轉換為 ISO 格式字符串
 * @param {Date|string} date - 日期對象或日期字符串
 * @param {string} time - 時間字符串 (HH:mm 格式)
 * @returns {string|null} ISO 格式的日期時間字符串
 */
export const formatToISODateTime = (date, time) => {
  try {
    // 確保 date 是 Date 對象
    const dateObj = new Date(date);
    if (!(dateObj instanceof Date) || isNaN(dateObj)) {
      throw new Error("Invalid date");
    }

    // 解析時間
    const [hours, minutes] = time.split(":");

    // 設置時間
    dateObj.setHours(parseInt(hours, 10));
    dateObj.setMinutes(parseInt(minutes, 10));
    dateObj.setSeconds(0);

    // 返回 ISO 格式的字符串
    return format(dateObj, "yyyy-MM-dd'T'HH:mm:ss");
  } catch (error) {
    console.error("Error formatting date time:", error);
    return null;
  }
};

//日期格式化函數
export const formatDate = (date) => {
  const d = new Date(date);
  const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
  return `${date} (${weekdays[d.getDay()]})`;
};
