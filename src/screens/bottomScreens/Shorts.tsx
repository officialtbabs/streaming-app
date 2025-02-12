import React, {useCallback, useRef} from 'react';
import Box from '../../components/box/Box';
import Video, {VideoRef} from 'react-native-video';
import HeaderComponent from '../../components/headers/HeaderComponent';
import {
  useAppDispatch,
  useAppSelector,
  useStatusBarHeight,
} from '../../constants/utils/hooks';
import Carousel from 'react-native-reanimated-carousel';
import {height, width} from '../../globalStyles/globalStyles';
import MainLayoutWithScroll from '../../components/layouts/MainLayoutWithScroll';
import {useFocusEffect} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {
  resetMoviesState,
  updateCurrentIndex,
  updateMoviesState,
} from '../../reducerSlices/moviesSlice';
import TextComponent from '../../components/text/TextComponent';
import LikeSvgIcon from '../../assets/icons/LikeSvgIcon';
import pallete from '../../constants/colors/pallete';
import SaveSvgIcon from '../../assets/icons/SaveSvgIcon';
import ShareSvgIcon from '../../assets/icons/ShareSvgIcon';
import ButtonWithIconComponent from '../../components/button/ButtonWithIconComponent';
import PlaySvgIcon from '../../assets/icons/PlaySvgIcon';
import LinearGradient from 'react-native-linear-gradient';

const Shorts = () => {
  const globalStyles = useAppSelector(state => state.globalStyles.styles);

  const dispatch = useAppDispatch();

  const movies = useAppSelector(state => state.movies.list);
  const currentIndex = useAppSelector(state => state.movies.currentIndex);

  const {statusBarHeight} = useStatusBarHeight();
  const videoRefs = useRef<(VideoRef | null)[]>([]);

  const handleCurrentIndexChange = useCallback(
    (index: number) => {
      dispatch(updateCurrentIndex(index));
    },
    [dispatch],
  );

  const handleIndexChange = useCallback(() => {
    dispatch(
      updateMoviesState({
        currentIndex,
        isPaused: true,
        seekTime: 0,
        updateAllExceptCurrent: true,
      }),
    );

    dispatch(
      updateMoviesState({
        currentIndex,
        isPaused: false,
      }),
    );
  }, [dispatch, currentIndex]);

  const handleSeekTime = useCallback(async () => {
    const currentVideo = movies?.[currentIndex];

    if (currentVideo && videoRefs.current[currentIndex]) {
      videoRefs.current[currentIndex]?.seek(currentVideo.seekTime || 0);
    }
  }, [movies, currentIndex]);

  useFocusEffect(handleIndexChange);
  useFocusEffect(() => {
    handleSeekTime();
  });

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(resetMoviesState());
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]),
  );

  return (
    <MainLayoutWithScroll layoutHeader={<HeaderComponent />}>
      <Box>
        <Carousel
          vertical
          width={width}
          defaultIndex={currentIndex}
          height={
            statusBarHeight ? height - (99 + statusBarHeight) : height - 99
          }
          data={movies ? movies : []}
          scrollAnimationDuration={300}
          snapEnabled
          onSnapToItem={index => handleCurrentIndexChange(index)}
          renderItem={({item, index}) => (
            <Box style={[globalStyles.flex, globalStyles.relative]}>
              <TouchableOpacity style={[globalStyles.flex]}>
                <Video
                  ref={ref => (videoRefs.current[index] = ref)}
                  key={item.id}
                  source={{
                    uri: `https://res.cloudinary.com/dl7jxi8kk/video/upload/v1738984638/${item.id}.mp4`,
                  }}
                  style={[globalStyles.flex]}
                  muted={false}
                  paused={item.isPaused}
                  repeat={true}
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  globalStyles.wFull,
                  globalStyles.h59p75,
                  globalStyles.absolute,
                  globalStyles.bottom0,
                ]}>
                <LinearGradient
                  colors={['#0F0F0F', '#00000000']}
                  locations={[0.03, 1]}
                  useAngle
                  angle={0}
                  angleCenter={{x: 0.5, y: 1}}
                  style={[
                    globalStyles.flexRow,
                    globalStyles.justifyBetween,
                    globalStyles.itemsEnd,
                  ]}>
                  <Box style={globalStyles.pl3}>
                    <Box
                      style={[globalStyles.maxWidth67, globalStyles.gapY0p5]}>
                      <Box style={[globalStyles.flexRow]}>
                        <TextComponent
                          style={[
                            globalStyles.textWhite,
                            globalStyles.fontBold,
                            globalStyles.leading6,
                            globalStyles.textShadow,
                          ]}>
                          {item.title}
                        </TextComponent>
                      </Box>

                      <Box style={[globalStyles.flexRow]}>
                        <TextComponent
                          numberOfLines={2}
                          style={[
                            globalStyles.textWhite,
                            globalStyles.textSm,
                            globalStyles.fontMedium,
                            globalStyles.leading4p5,
                            globalStyles.textShadow,
                          ]}>
                          To escape a politically motivated arranged marriage, a
                          privileged heir Lucas...
                        </TextComponent>
                      </Box>
                    </Box>

                    <ButtonWithIconComponent
                      title="Watch Now"
                      icon={<PlaySvgIcon color={pallete.white} />}
                      onPress={() => null}
                      wrapperStyles={[
                        globalStyles.bgRose600,
                        globalStyles.h8,
                        globalStyles.px7,
                        globalStyles.roundedMd,
                        globalStyles.maxWidth51,
                        globalStyles.mt3,
                      ]}
                      textSyles={[
                        globalStyles.textWhite,
                        globalStyles.fontSemiBold,
                        globalStyles.leading5,
                      ]}
                    />
                  </Box>

                  <Box
                    style={[
                      globalStyles.hFull,
                      globalStyles.justifyBetween,
                      globalStyles.py7,
                      globalStyles.px3,
                    ]}>
                    <Box>
                      <LikeSvgIcon color={pallete.whiteOpacity80} />
                      <TextComponent
                        style={[
                          globalStyles.textWhite,
                          globalStyles.textXs,
                          globalStyles.leading3,
                          globalStyles.textCenter,
                        ]}>
                        11.5K
                      </TextComponent>
                    </Box>

                    <Box>
                      <SaveSvgIcon color={pallete.whiteOpacity80} />
                      <TextComponent
                        style={[
                          globalStyles.textWhite,
                          globalStyles.textXs,
                          globalStyles.leading3,
                          globalStyles.textCenter,
                        ]}>
                        312
                      </TextComponent>
                    </Box>

                    <Box>
                      <ShareSvgIcon color={pallete.whiteOpacity80} />
                      <TextComponent
                        style={[
                          globalStyles.textWhite,
                          globalStyles.textXs,
                          globalStyles.leading3,
                          globalStyles.textCenter,
                        ]}>
                        20
                      </TextComponent>
                    </Box>
                  </Box>
                </LinearGradient>
              </TouchableOpacity>
            </Box>
          )}
        />
      </Box>
    </MainLayoutWithScroll>
  );
};

export default Shorts;
