function outerFunction() {
    try {
      console.log('Outer try block start');
      innerFunction();
      console.log('Outer try block end');
    } catch (error) {
      console.log('Caught in outer catch:', error.message);
    }
  }
  
  function innerFunction() {
    try {
      console.log('Inner try block start');
      // Một lỗi xảy ra ở đây
      throw new Error('Error in inner function');
      console.log('Inner try block end');
    } catch (error) {
      console.log('Caught in inner catch:', error.message);
      // Ném ngoại lệ ra ngoài
      throw new Error('Re-throwing error from inner catch');
    }
  }
  
  // Chạy hàm outerFunction để kiểm tra
  outerFunction();
  