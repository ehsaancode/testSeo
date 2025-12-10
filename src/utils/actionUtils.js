// // utils/actionUtils.js
// export const ApiUtils = {
//   async fetchData(url, options = {}) {
//     try {
//       const response = await fetch(url, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         ...options,
//       });
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
//       return await response.json();
//     } catch (error) {
//       console.error("API Fetch Error:", error);
//       throw error;
//     }
//   },

//   async postData(url, payload, options = {}) {
//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//         ...options,
//       });
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
//       return await response.json();
//     } catch (error) {
//       console.error("API Post Error:", error);
//       throw error;
//     }
//   },

//   async updateData(url, payload, options = {}) {
//     try {
//       const response = await fetch(url, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//         ...options,
//       });
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
//       return await response.json();
//     } catch (error) {
//       console.error("API Update Error:", error);
//       throw error;
//     }
//   },

//   async deleteData(url, options = {}) {
//     try {
//       const response = await fetch(url, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         ...options,
//       });
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
//       return response.status === 204 ? null : await response.json();
//     } catch (error) {
//       console.error("API Delete Error:", error);
//       throw error;
//     }
//   },
// };

// export const UIUtils = {
//   setLoading(setter, isLoading) {
//     setter(isLoading);
//     console.log(`Loading state: ${isLoading}`);
//   },

//   setError(setter, error) {
//     setter(error);
//     console.log(`Error: ${error}`);
//   },

//   clearError(setter) {
//     setter("");
//   },

//   setSuccess(setter, message) {
//     setter(message);
//     console.log(`Success: ${message}`);
//   },

//   clearSuccess(setter) {
//     setter("");
//   },

//   showNotification(setter, message, type = "info", duration = 3000) {
//     const notification = {
//       id: Date.now(),
//       message,
//       type,
//       timestamp: new Date().toLocaleTimeString(),
//     };

//     setter((prev) => [...prev, notification]);
//     console.log(`Notification: ${message} (${type})`);

//     if (duration > 0) {
//       setTimeout(() => {
//         setter((prev) => prev.filter((n) => n.id !== notification.id));
//       }, duration);
//     }
//   },

//   clearNotifications(setter) {
//     setter([]);
//   },

//   updateProgress(setter, value) {
//     setter(Math.min(Math.max(value, 0), 100));
//   },
// };

// export const NavigationUtils = {
//   navigateTo(navigate, path, options = {}) {
//     navigate(path, options);
//     console.log(`Navigating to: ${path}`);
//   },

//   goBack(navigate, steps = 1) {
//     // console.log(`Going back ${steps} steps`, navigate);

//     navigate(-steps);
//     console.log(`Going back ${steps} steps`);
//   },

//   redirectTo(navigate, path) {
//     navigate(path, { replace: true });
//     console.log(`Redirecting to: ${path}`);
//   },
// };

// export const FormUtils = {
//   validateEmail(email) {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   },

//   validateRequired(value) {
//     return value && value.toString().trim().length > 0;
//   },

//   validateForm(data, rules) {
//     const errors = {};

//     Object.entries(rules).forEach(([field, rule]) => {
//       const value = data[field];

//       if (rule.required && !this.validateRequired(value)) {
//         errors[field] = `${field} is required`;
//       } else if (rule.email && value && !this.validateEmail(value)) {
//         errors[field] = `${field} must be a valid email`;
//       }
//     });

//     return { isValid: Object.keys(errors).length === 0, errors };
//   },

//   clearForm(setter, initialState) {
//     setter(initialState);
//   },
// };

// export const DataUtils = {
//   sortData(data, key, direction = "asc") {
//     return [...data].sort((a, b) => {
//       const aVal = a[key] || "";
//       const bVal = b[key] || "";

//       if (direction === "asc") {
//         return aVal.toString().localeCompare(bVal.toString());
//       } else {
//         return bVal.toString().localeCompare(aVal.toString());
//       }
//     });
//   },

//   filterData(data, searchTerm, searchFields) {
//     if (!searchTerm) return data;

//     return data.filter((item) =>
//       searchFields.some((field) =>
//         item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   },

//   toggleSelection(selectedItems, itemId) {
//     return selectedItems.includes(itemId)
//       ? selectedItems.filter((id) => id !== itemId)
//       : [...selectedItems, itemId];
//   },
// };

// export const StorageUtils = {
//   save(key, data) {
//     try {
//       localStorage.setItem(key, JSON.stringify(data));
//       return true;
//     } catch (error) {
//       console.error("Failed to save to localStorage:", error);
//       return false;
//     }
//   },

//   get(key, defaultValue = null) {
//     try {
//       const item = localStorage.getItem(key);
//       return item ? JSON.parse(item) : defaultValue;
//     } catch (error) {
//       console.error("Failed to get from localStorage:", error);
//       return defaultValue;
//     }
//   },
// };

// utils/actionUtils.js
export const ApiUtils = {
  /**
   * Dynamic API call utility
   * @param {Object} config - Configuration object
   * @param {string} config.url - API endpoint URL
   * @param {string} [config.method="GET"] - HTTP method (GET, POST, PUT, DELETE, PATCH)
   * @param {Object} [config.headers] - Custom headers
   * @param {Object|string} [config.body] - Payload for POST/PUT/PATCH
   * @param {string} [config.responseKey] - If provided, returns only that key from response
   * @param {boolean} [config.raw=false] - If true, returns full Response object instead of parsed JSON
   * @returns {Promise<any>} - Response data or specific key
   */
  async request(config) {
    const {
      url,
      method = "GET",
      headers = {},
      body,
      responseKey,
      raw = false,
    } = config;

    if (!url) throw new Error("ApiUtils.request: 'url' is required");

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...headers },
        ...(body
          ? { body: typeof body === "string" ? body : JSON.stringify(body) }
          : {}),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      if (raw) return response;

      const data = await response.json();

      return responseKey ? data?.[responseKey] : data;
    } catch (error) {
      console.error(`API ${method} Error:`, error);
      throw error;
    }
  },

  async fetchData(url, options = {}) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        ...options,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("API Fetch Error:", error);
      throw error;
    }
  },

  async postData(url, payload, options = {}) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        ...options,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("API Post Error:", error);
      throw error;
    }
  },

  async updateData(url, payload, options = {}) {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        ...options,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("API Update Error:", error);
      throw error;
    }
  },

  async deleteData(url, options = {}) {
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        ...options,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.status === 204 ? null : await response.json();
    } catch (error) {
      console.error("API Delete Error:", error);
      throw error;
    }
  },
};

export const UIUtils = {
  setLoading(setter, isLoading) {
    setter(isLoading);
  },

  setError(setter, error) {
    setter(error);
  },

  clearError(setter) {
    setter("");
  },

  setSuccess(setter, message) {
    setter(message);
  },

  clearSuccess(setter) {
    setter("");
  },

  showNotification(setter, message, type = "info", duration = 3000) {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString(),
    };

    setter((prev) => [...prev, notification]);

    if (duration > 0) {
      setTimeout(() => {
        setter((prev) => prev.filter((n) => n.id !== notification.id));
      }, duration);
    }
  },

  clearNotifications(setter) {
    setter([]);
  },

  updateProgress(setter, value) {
    setter(Math.min(Math.max(value, 0), 100));
  },
};

export const NavigationUtils = {
  navigateTo(navigate, path, options = {}) {
    navigate(path, options);
  },

  goBack(navigate, steps = 1) {
    // console.log(`Going back ${steps} steps`, navigate);

    navigate(-steps);
  },

  redirectTo(navigate, path) {
    navigate(path, { replace: true });
  },
};

export const FormUtils = {
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  validateRequired(value) {
    return value && value.toString().trim().length > 0;
  },

  validateForm(data, rules) {
    const errors = {};

    Object.entries(rules).forEach(([field, rule]) => {
      const value = data[field];

      if (rule.required && !this.validateRequired(value)) {
        errors[field] = `${field} is required`;
      } else if (rule.email && value && !this.validateEmail(value)) {
        errors[field] = `${field} must be a valid email`;
      }
    });

    return { isValid: Object.keys(errors).length === 0, errors };
  },

  clearForm(setter, initialState) {
    setter(initialState);
  },
};

export const DataUtils = {
  sortData(data, key, direction = "asc") {
    return [...data].sort((a, b) => {
      const aVal = a[key] || "";
      const bVal = b[key] || "";

      if (direction === "asc") {
        return aVal.toString().localeCompare(bVal.toString());
      } else {
        return bVal.toString().localeCompare(aVal.toString());
      }
    });
  },

  filterData(data, searchTerm, searchFields) {
    if (!searchTerm) return data;

    return data.filter((item) =>
      searchFields.some((field) =>
        item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  },

  toggleSelection(selectedItems, itemId) {
    return selectedItems.includes(itemId)
      ? selectedItems.filter((id) => id !== itemId)
      : [...selectedItems, itemId];
  },
};

export const StorageUtils = {
  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
      return false;
    }
  },

  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Failed to get from localStorage:", error);
      return defaultValue;
    }
  },
};
