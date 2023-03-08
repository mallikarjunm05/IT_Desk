const passport = require("passport");
const passportAzureAd = require("passport-azure-ad");
const authConfig = require("./authConfig");

module.exports.bearerStrategy = new passportAzureAd.BearerStrategy(
{
    identityMetadata: `https://${authConfig.metadata.authority}/${authConfig.credentials.tenantID}/${authConfig.metadata.version}/${authConfig.metadata.discovery}`,
    issuer: `https://${authConfig.metadata.authority}/${authConfig.credentials.tenantID}/${authConfig.metadata.version}`,
    clientID: authConfig.credentials.clientID,
    audience: authConfig.credentials.clientID, // audience is this application
    validateIssuer: authConfig.settings.validateIssuer,
    passReqToCallback: authConfig.settings.passReqToCallback,
    loggingNoPII: authConfig.settings.loggingNoPII,
},
(req, token, done) => {
if (!token.hasOwnProperty("idp") && !token.hasOwnProperty("aio")) {
    return done(
        new Error("Unauthorized"),
        null,
        "No delegated or app permission claims found"
        );
    }
    return done(null, {}, token);
}
);
    
module.exports.isAuthenticated = (req, res, next) => {
    passport.authenticate('oauth-bearer', {
        session: false,
    }, (err, user, info) => {
        if (err) {
            return res.status(401).json({ error: err.message });
        }
        
        if (!user) {
            // If no user object found, send a 401 response.
            return res.status(401).json({ error: 'Unauthorized' });
        }
        
        if (info) {
            // access token payload will be available in req.authInfo downstream
            req.authInfo = info;
            return next();
        }
    })(req, res, next);
};