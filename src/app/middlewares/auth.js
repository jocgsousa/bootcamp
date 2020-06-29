import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (request, response, next) => {
  const auhHeader = request.headers.authorization;
  if (!auhHeader) {
    return response.status(401).json({ error: 'Token não informado' });
  }
  const [, token] = auhHeader.split(' ');
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secrect);
    request.userId = decoded.id;
    return next();
  } catch (error) {
    return response.status({ error: 'Token inválido' });
  }
};
