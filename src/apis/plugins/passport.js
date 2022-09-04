const { Strategy, ExtractJwt } = require('passport-jwt')
const moment = require('moment')
const env = require('../../configs/env')
const { tokenTypes } = require('../../configs/tokens')

const httpStatus = require('http-status')

const { User } = require('../models')

const GooglePlusTokenStrategy = require('passport-google-plus-token')
const FacebookTokenStrategy = require('passport-facebook-token')
//Passport Google
const GooglePassportOptions = {
    clientID: env.passport.googlePlusClientID,
    clientSecret: env.passport.googlePlusSecert,
}

const googlePassportStrategy = new GooglePlusTokenStrategy(
    GooglePassportOptions,
    async (accessToken, refreshToken, profile, done) => {
        try {
            //Find User if exists in DB
            const user = await User.findOne({
                authGoogleID: profile.id,
                authType: 'google',
            })
            // console.log(user)
            if (!!user) {
                done(null, user)
            } else {
                const newUser = new User({
                    authType: 'google',
                    authGoogleID: profile.id,
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    displayName: profile.displayName,
                    profileImageUrl: profile.photos[0].value,
                    isVerified: true,
                })
                await newUser.save()
                done(null, newUser)
            }
        } catch (error) {
            done(error)
        }
    }
)

//Passport Facebook
const FacebookPassportOptions = {
    clientID: env.passport.facebookClientID,
    clientSecret: env.passport.facebookSecert,
}

const facebookPassportStrategy = new FacebookTokenStrategy(
    FacebookPassportOptions,
    async (accessToken, refreshToken, profile, done) => {
        try {
            //Find User if exists in DB
            const user = await User.findOne({
                authFacebookID: profile.id,
                authType: 'facebook',
            })
            if (!!user) {
                done(null, user)
            } else {
                const newUser = new User({
                    authType: 'facebook',
                    authFacebookID: profile.id,
                    email: profile.emails[0]?.value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    displayName: profile.displayName,
                    profileImageUrl: profile.photos[0]?.value,
                    isVerified: true,
                })
                await newUser.save()
                done(null, newUser)
            }
        } catch (error) {
            done(error)
        }
    }
)

//Passport JWT
const jwtOptions = {
    secretOrKey: env.passport.jwtToken,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
}

const jwtVerify = async (payload, done) => {
    try {
        if (payload.type !== tokenTypes.ACCESS) {
            throw new Error('Invalid token type')
        }
        const user = await User.findById(payload.sub)
        if (!user) {
            return done(null, false)
        }
        if (moment(payload.exp).diff(moment(Date.now())) < 0) {
            return done(null, user)
        } else {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Access token is expired...')
        }
    } catch (error) {
        return done(error, false)
    }
}

const jwtStrategy = new Strategy(jwtOptions, jwtVerify)

module.exports = {
    jwtStrategy,
    googlePassportStrategy,
    facebookPassportStrategy,
}
