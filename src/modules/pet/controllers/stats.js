import Pet from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const petStats = async (req, res) => {
  const userId = get(req, 'userData.userId');
  try {
    const totalCount = await Pet.countDocuments();

    const result = {
      totalCount,
      totalCountDouble: totalCount * 2,
      totalCountTriple: totalCount * 3,
      totalCountTen: totalCount * 10,
    };

    res.status(200).json(message.success('Pet Stats ok', result));
  } catch (error) {
    const analyticsId = analytics('PET_STATS_ERROR', {
      error,
      body: req.body,
      entity: 'Pet',
      user: userId,
      controller: 'petStats',
    });

    res.status(400).json(message.fail('Pet Stats error', analyticsId));
  }
};

export default petStats;
