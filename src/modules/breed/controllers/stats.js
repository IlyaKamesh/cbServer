import Breed from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const breedStats = async (req, res) => {
  const userId = get(req, 'userData.userId');
  try {
    const totalCount = await Breed.countDocuments();

    const result = {
      totalCount,
      totalCountDouble: totalCount * 2,
      totalCountTriple: totalCount * 3,
      totalCountTen: totalCount * 10,
    };

    res.status(200).json(message.success('Breed Stats ok', result));
  } catch (error) {
    const analyticsId = analytics('BREED_STATS_ERROR', {
      error,
      body: req.body,
      entity: 'Breed',
      user: userId,
      controller: 'breedStats',
    });

    res.status(400).json(message.fail('Breed Stats error', analyticsId));
  }
};

export default breedStats;
