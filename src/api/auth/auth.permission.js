const _ = require('lodash');
const AppError = require('../../common/error/error');
const { httpStatus } = require('../../common/error/http-status');

module.exports = {
  isNotLogined: (req, res, next) => {
    if (!req.user) {
      next();
    } else {
      // role is allowed, so continue on the next middleware
      throw new AppError(
        httpStatus.FORBIDDEN,
        'Bạn đã đăng nhập.',
        true,
      );
    }
  },
  checkPermission: (...allowed) => {
    const isAllowed = (usersRole = []) => {
      // If allowed array contain *, then return true
      if (_.intersection(...allowed, ['*']).length > 0) {
        return true;
      }
      // If user's role include in allowed array
      if (_.intersection(usersRole, ...allowed).length > 0) {
        return true;
      }
      return false;
    };

    // return a middleware
    return (req, res, next) => {
      if (!req.user) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'Vui lòng đăng nhập để tiếp tục.',
          true,
        );
      } else if (isAllowed([req.user.role])) {
        next();
      } else {
        // role is allowed, so continue on the next middleware
        throw new AppError(
          httpStatus.FORBIDDEN,
          'Bạn không được cấp quyền để truy cập trang này.',
          true,
        );
      }
    };
  },
};
