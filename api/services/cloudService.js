const _ = require("lodash-4.17");
const { DataApi } = require("@unity-services/cloud-save-1.4");


/**
 * Service to perform operations on the Unity Cloud Save API
 * @param {Object} options - Options for the service
 * @param {Object} options.params - Parameters for the service
 * @param {Object} options.context - Context for the service
 * @param {Object} options.logger - Logger for the service
 * @returns {Promise<void>}
 */
module.exports = async ({ params, context, logger }) => {
  // Extract projectId and playerId from context
  const { projectId, playerId } = context;

  // Create a new instance of the Unity Cloud Save API
  const cloudSaveApi = new DataApi(context);

  try {
    // --------------------------------------------------------------------------------
    // Query player data with the key `health` to find players with health lower than 100

    // Set data for player
    const requestData = {
      // Data to be set for the player
      data: [{
        key: "health", // Key of the data
        value: 95, // Value of the data
      },
        {
          key: "stamina", // Key of the data
          value: 20, // Value of the data
        }
      ]
    };

    // Set the data for the player
    await cloudSaveApi.setItemBatch(projectId, playerId, requestData);

    // Query and return player stamina for players with health less than 100
    const query = {
      fields: [{
        asc: true, // Sort order
        key: 'health', // Key to query
        op: 'LT', // Operation to perform
        value: 100, // Value to compare against
      }],
      returnKeys: ["stamina"] // Keys to return in the query results
    };

    // Query the player data and log the results
    const queryRes = await cloudSaveApi.queryDefaultPlayerData(projectId, query);
    logger.info(`Query results: ${JSON.stringify(queryRes.data)}`);

    // --------------------------------------------------------------------------------
    // Query private custom data to retrieve game levels with easy difficulty

    // Record two levels with different difficulty levels
    const casteLevelId = "castleLevel";
    const anotherLevelId = "forestLevel";

    // Set the private custom data for the levels
    await cloudSaveApi.setPrivateCustomItem(projectId, casteLevelId, {
      key: "difficulty", // Key of the data
      value: "easy" // Value of the data
    });

    await cloudSaveApi.setPrivateCustomItem(projectId, anotherLevelId, {
      key: "difficulty", // Key of the data
      value: "hard" // Value of the data
    });

    // Query levels with easy levels only
    const privateQuery = {
      fields: [{
        asc: false, // Sort order
        key: 'difficulty', // Key to query
        op: 'EQ', // Operation to perform
        value: 'easy' // Value to compare against
      }],
    };

    // Query the private custom data and log the results
    const privateQueryRes = await cloudSaveApi.queryPrivateCustomData(projectId, privateQuery);
    logger.info(`Private query results: ${JSON.stringify(privateQueryRes.data)}`);

    // --------------------------------------------------------------------------------
    // Query protected player data for players that are over level 5

    // Set data for player
    const protectedRequestData = {
      data: [{
        key: "level", // Key of the data
        value: 15, // Value of the data
      },
        {
          key: "experiencePoints", // Key of the data
          value: 20, // Value of the data
        }
      ]
    };

    // Set the protected player data
    await cloudSaveApi.setProtectedItemBatch(projectId, playerId, protectedRequestData);

    // Query players over level 5, and return their health
    const protectedPlayerQuery = {
      fields: [{
        asc: true, // Sort order
        key: 'level', // Key to query
        op: 'GT', // Operation to perform
        value: 5, // Value to compare against
      }],
      returnKeys: ["experiencePoints", "level"] // Keys to return in the query results
    };

    // Query the protected player data and log the results
    const protectedPlayerRes = await cloudSaveApi.queryProtectedPlayerData(projectId, protectedPlayerQuery);
    logger.info(`Protected player query results: ${JSON.stringify(protectedPlayerRes.data)}`);

    // --------------------------------------------------------------------------------

  } catch (err) {
    // Log any errors that occur and re-throw them
    logger.error("Error while calling out to Cloud Save", { "error.message": err.message });
    throw err;
  }

};
