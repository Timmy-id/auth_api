import { omit, get } from 'lodash';
import { FilterQuery, QueryOptions } from 'mongoose';
import config from 'config';
import { DocumentType } from '@typegoose/typegoose';
import userModel, { User } from './user.model';
import { signJwt } from '../../utils/jwt';
import redisClient from '../../utils/connectRedis';
import { excludedFields } from '../auth/auth.controller';

export const createUser = async (input: Partial<User>) => {
    const user = await userModel.create(input);
    return omit(user.toJSON(), excludedFields);
};

export const findUser = async (
    query: FilterQuery<User>,
    options: QueryOptions = {}
) => {
    return await userModel.findOne(query, {}, options).select('+password');
};

export const signToken = async (user: DocumentType<User>) => {
    const accessToken = signJwt(
        { sub: user._id },
        {
            expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`
        }
    );

    redisClient.set(user._id, JSON.stringify(user), {
        EX: 60 * 60,
    });
    return { accessToken };
}