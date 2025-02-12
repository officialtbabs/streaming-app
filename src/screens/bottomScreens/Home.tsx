import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {ImageBackground, TouchableOpacity} from 'react-native';
import Box from '../../components/box/Box';
import Video, {VideoRef} from 'react-native-video';
import HeaderComponent from '../../components/headers/HeaderComponent';
import {useAppDispatch, useAppSelector} from '../../constants/utils/hooks';
import Carousel from 'react-native-reanimated-carousel';
import {width} from '../../globalStyles/globalStyles';
import MainLayoutWithScroll from '../../components/layouts/MainLayoutWithScroll';
import LinearGradient from 'react-native-linear-gradient';
import pallete from '../../constants/colors/pallete';
import ChipComponent from '../../components/chip/ChipComponent';
import ButtonWithIconComponent from '../../components/button/ButtonWithIconComponent';
import PlaySvgIcon from '../../assets/icons/PlaySvgIcon';
import {BottomTabNavigationProps, Movie} from '../../constants/types/types';
import SectionHeaderComponent from '../../components/headers/SectionHeaderComponent';
import {FlashList} from '@shopify/flash-list';
import MovieCard from '../../components/cards/MovieCard';
import {
  setMovies,
  updateCurrentIndex,
  updateMoviesState,
} from '../../reducerSlices/moviesSlice';
import {
  setCarouselMovies,
  updateAutoPlay,
  updateCarouselMoviesState,
  updateCurrentCarouselIndex,
} from '../../reducerSlices/carouselMoviesSlice';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import CategoryCard, {
  CategoryCardProps,
} from '../../components/cards/CategoryCard';

import FindingNemo from '../../assets/images/finding-nemo.jpeg';
import FightClub from '../../assets/images/fight-club.jpeg';
import Interstellar from '../../assets/images/Interstellar.jpeg';
import LiloAndStitch from '../../assets/images/lilo-and-stitch.jpeg';
import TheMaster from '../../assets/images/the-master.jpeg';
import BackToTheFuture from '../../assets/images/back-to-the-future.jpeg';

const Home = () => {
  const globalStyles = useAppSelector(state => state.globalStyles.styles);
  const {navigate} = useNavigation<BottomTabNavigationProps>();
  const dispatch = useAppDispatch();

  const movies = useAppSelector(state => state.movies.list);
  const carouselMovies = useAppSelector(state => state.carouselMovies.list);
  const currentCarouselIndex = useAppSelector(
    state => state.carouselMovies.currentCarouselIndex,
  );
  const autoPlay = useAppSelector(state => state.carouselMovies.autoPlay);

  const videoRefs = useRef<(VideoRef | null)[]>([]);

  const currentCarouselIndexContent = useMemo<Movie | null>(
    () =>
      carouselMovies &&
      carouselMovies.filter(
        (_option, index) => currentCarouselIndex === index,
      )[0],
    [carouselMovies, currentCarouselIndex],
  );

  const filteredGenre = useMemo(() => ['new', 'trending'], []);

  const continueWatching = useMemo<Movie[] | null>(
    () => movies && movies.filter(movie => movie.genres?.includes('romance')),
    [movies],
  );

  const trendingMovies = useMemo<Movie[] | null>(
    () => movies && movies.filter(movie => movie.genres?.includes('trending')),
    [movies],
  );

  const moviesForYou = useMemo<Movie[] | null>(
    () => movies && movies.filter(movie => movie.genres?.includes('detective')),
    [movies],
  );

  const dramas = useMemo<Movie[] | null>(
    () => movies && movies.filter(movie => movie.genres?.includes('drama')),
    [movies],
  );

  const documentaries = useMemo<Movie[] | null>(
    () =>
      movies && movies.filter(movie => movie.genres?.includes('documentary')),
    [movies],
  );

  const categories = useMemo<CategoryCardProps[]>(
    () => [
      {
        title: 'drama',
        colorStops: {start: '#D1D3B5', stop: '#0A4E81'},
      },
      {
        title: 'crime',
        colorStops: {start: '#00BDD9', stop: '#5157A9'},
      },
      {
        title: 'comedy',
        colorStops: {start: '#FECBAB', stop: '#FF7B80'},
      },
      {
        title: 'romance',
        colorStops: {start: '#405CB1', stop: '#745F9A'},
      },
    ],
    [],
  );

  // const [autoPlay, setAutoPlay] = useState<boolean>(true);

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleCurrentIndexChange = useCallback(
    (index: number) => {
      dispatch(updateCurrentCarouselIndex(index));
    },
    [dispatch],
  );

  const handleIndexChange = useCallback(() => {
    clearTimeout(timeoutRef.current);
    dispatch(updateAutoPlay(true));

    dispatch(
      updateCarouselMoviesState({
        currentCarouselIndex,
        isPaused: true,
        showPoster: true,
        updateAllExceptCurrent: true,
      }),
    );

    timeoutRef.current = setTimeout(async () => {
      dispatch(
        updateCarouselMoviesState({
          currentCarouselIndex,
          isPaused: false,
          showPoster: false,
        }),
      );
    }, 3000);
  }, [dispatch, currentCarouselIndex]);

  const handleVideoProgress = useCallback(async () => {
    const currentTime = await videoRefs.current[
      currentCarouselIndex
    ]?.getCurrentPosition();

    if (currentTime !== undefined) {
      dispatch(
        updateCarouselMoviesState({
          currentCarouselIndex,
          seekTime: currentTime,
        }),
      );
    }
  }, [currentCarouselIndex, dispatch]);

  const navigateToVideoPlay = useCallback(async () => {
    const currentTime = await videoRefs.current[
      currentCarouselIndex
    ]?.getCurrentPosition();

    movies?.forEach((movie, index) => {
      if (movie.id === currentCarouselIndexContent?.id) {
        dispatch(updateCurrentIndex(index));
        dispatch(
          updateMoviesState({
            currentIndex: index,
            isPaused: false,
            seekTime: currentTime || 0,
          }),
        );
        navigate('shorts');
        dispatch(updateAutoPlay(false));
      }
    });
  }, [
    movies,
    currentCarouselIndex,
    currentCarouselIndexContent,
    navigate,
    dispatch,
  ]);

  useEffect(() => {
    dispatch(
      setMovies([
        {
          id: 'iexpmibvgyk96iqy7ybz',
          title: 'Back To The Future',
          genres: ['new', 'romance', 'drama'],
          cover: BackToTheFuture,
          isPaused: true,
          showPoster: true,
          seekTime: 0,
        },
        {
          id: 'cf8tcvy5nlythwqritwp',
          title: 'Fight Club',
          genres: ['detective', 'crime', 'trending'],
          cover: FightClub,
          isPaused: true,
          showPoster: true,
          seekTime: 0,
        },
        {
          id: 'njqu1s02nkqhvmjb6zzn',
          title: 'Interstellar',
          genres: ['romance', 'drama', 'trending'],
          cover: Interstellar,
          isPaused: true,
          showPoster: true,
          seekTime: 0,
        },
        {
          id: 'ncdig5tpopmnaov3qoba',
          title: 'Finding Nemo',
          genres: ['new', 'detective', 'crime'],
          cover: FindingNemo,
          isPaused: true,
          showPoster: true,
          seekTime: 0,
        },
        {
          id: 'ftn2z5ntu5gdrrimsna6',
          title: 'Lilo And Stitch',
          genres: ['crime', 'detective', 'trending', 'romance'],
          cover: LiloAndStitch,
          isPaused: true,
          showPoster: true,
          seekTime: 0,
        },
        {
          id: 'ca8q828dwaptgmttxc3t',
          title: 'The Master',
          genres: ['new', 'documentary', 'drama'],
          cover: TheMaster,
          isPaused: true,
          showPoster: true,
          seekTime: 0,
        },
      ]),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    movies &&
      dispatch(
        setCarouselMovies(
          movies.filter(movie => movie.genres?.includes('new')),
        ),
      );
  }, [movies, dispatch]);

  useEffect(() => {
    currentCarouselIndex !== undefined && handleVideoProgress();
  }, [currentCarouselIndex, handleVideoProgress]);

  useFocusEffect(handleIndexChange);

  useFocusEffect(
    useCallback(() => {
      handleCurrentIndexChange(0);

      return () => {
        clearTimeout(timeoutRef.current);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <MainLayoutWithScroll layoutHeader={<HeaderComponent />}>
      <Box style={[globalStyles.flex, globalStyles.pb20]}>
        <Box style={[globalStyles.relative]}>
          <Carousel
            loop
            width={width}
            height={578}
            autoPlay={autoPlay}
            autoPlayInterval={6000}
            snapEnabled
            defaultIndex={currentCarouselIndex}
            data={carouselMovies ? carouselMovies : []}
            scrollAnimationDuration={500}
            onSnapToItem={index => handleCurrentIndexChange(index)}
            renderItem={({item, index}) => (
              <TouchableOpacity
                key={item.id}
                style={[globalStyles.flex]}
                onPress={navigateToVideoPlay}>
                {item.showPoster ? (
                  <ImageBackground
                    style={[globalStyles.flex]}
                    source={item.cover}
                    resizeMode="cover"
                  />
                ) : (
                  <>
                    <Video
                      ref={ref => (videoRefs.current[index] = ref)}
                      key={item.id}
                      source={{
                        uri: `https://res.cloudinary.com/dl7jxi8kk/video/upload/v1738984638/${item.id}.mp4`,
                      }}
                      style={[globalStyles.flex]}
                      muted={true}
                      paused={item.isPaused}
                      repeat={false}
                      resizeMode="cover"
                      poster={{
                        source: item.cover,
                        resizeMode: 'cover',
                        style: {...globalStyles.h144p5, ...globalStyles.wFull},
                      }}
                    />
                  </>
                )}
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity
            onPress={navigateToVideoPlay}
            style={[
              globalStyles.wFull,
              globalStyles.absolute,
              globalStyles.bottom0,
              globalStyles.h58p25,
            ]}>
            <LinearGradient
              style={[globalStyles.flex, globalStyles.relative]}
              colors={[pallete.black, '#00000000']}
              locations={[0.3, 1]}
              useAngle
              angle={0}
              angleCenter={{x: 0.5, y: 0.5}}>
              <Box
                style={[
                  globalStyles.wFull,
                  globalStyles.absolute,
                  globalStyles.bottom0,
                  globalStyles.itemsCenter,
                  globalStyles.gapY3,
                ]}>
                <Box
                  style={[
                    globalStyles.flexRow,
                    globalStyles.justifyCenter,
                    globalStyles.gapX2,
                  ]}>
                  {currentCarouselIndexContent?.genres &&
                    currentCarouselIndexContent.genres.map((genre, index) => (
                      <ChipComponent key={index} text={genre} />
                    ))}
                </Box>

                <ButtonWithIconComponent
                  title="Play"
                  icon={<PlaySvgIcon color={pallete.black} />}
                  onPress={navigateToVideoPlay}
                  wrapperStyles={[
                    globalStyles.bgWhite,
                    globalStyles.h11,
                    globalStyles.px7,
                    globalStyles.roundedLg,
                  ]}
                  textSyles={[
                    globalStyles.textBlack,
                    globalStyles.textLg,
                    globalStyles.fontSemiBold,
                    globalStyles.leading5,
                  ]}
                />
              </Box>
            </LinearGradient>
          </TouchableOpacity>
        </Box>

        <Box style={[globalStyles.gapY10, globalStyles.pt12p5]}>
          <Box
            style={[globalStyles.wFull, globalStyles.gapY5, globalStyles.flex]}>
            <Box style={[globalStyles.px5]}>
              <SectionHeaderComponent title="Continue watching" />
            </Box>

            <FlashList
              showsVerticalScrollIndicator={false}
              data={continueWatching}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <Box
                  style={[
                    index === 0 && globalStyles.ml5,
                    trendingMovies &&
                      index === trendingMovies.length - 1 &&
                      globalStyles.mr5,
                    trendingMovies &&
                      index < trendingMovies.length - 1 &&
                      globalStyles.mr3,
                  ]}>
                  <MovieCard
                    key={index}
                    id={item.id}
                    title={item.title}
                    cover={item.cover}
                    imageWidth={116}
                    imageHeight={155}
                    imageStyles={[globalStyles.roundedLg]}
                    wrappeStyles={[globalStyles.gapY1p25]}
                    titleStyle={[
                      globalStyles.textWhite,
                      globalStyles.textSm,
                      globalStyles.fontSemiBold,
                      globalStyles.textCapitalise,
                      globalStyles.leading4,
                    ]}
                    genreStyle={[
                      globalStyles.textWhite,
                      globalStyles.textXs,
                      globalStyles.textCapitalise,
                      globalStyles.leading3p5,
                    ]}
                  />
                </Box>
              )}
              estimatedItemSize={200}
            />
          </Box>

          <Box flex={1} style={[globalStyles.wFull, globalStyles.gapY5]}>
            <Box style={[globalStyles.px5]}>
              <SectionHeaderComponent title="Most Trending" />
            </Box>

            <FlashList
              data={trendingMovies}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <Box
                  style={[
                    index === 0 && globalStyles.ml5,
                    trendingMovies &&
                      index === trendingMovies.length - 1 &&
                      globalStyles.mr5,
                    trendingMovies &&
                      index < trendingMovies.length - 1 &&
                      globalStyles.mr3,
                  ]}>
                  <MovieCard
                    key={index}
                    id={item.id}
                    title={item.title}
                    genres={item.genres
                      ?.filter(genre => !filteredGenre.includes(genre))
                      .slice(0, 2)}
                    cover={item.cover}
                    imageWidth={146}
                    imageHeight={220}
                    showGenre
                    imageStyles={[globalStyles.roundedLg]}
                    wrappeStyles={[globalStyles.gapY1p25]}
                    titleStyle={[
                      globalStyles.textWhite,
                      globalStyles.textSm,
                      globalStyles.fontSemiBold,
                      globalStyles.textCapitalise,
                      globalStyles.leading4,
                    ]}
                    genreStyle={[
                      globalStyles.textWhite,
                      globalStyles.textXs,
                      globalStyles.textCapitalise,
                      globalStyles.leading3p5,
                    ]}
                  />
                </Box>
              )}
              estimatedItemSize={200}
            />
          </Box>

          <Box flex={1} style={[globalStyles.wFull, globalStyles.gapY5]}>
            <Box style={[globalStyles.px5]}>
              <SectionHeaderComponent title="By category" />
            </Box>

            <FlashList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({
                item: {
                  title,
                  colorStops: {start, stop},
                },
                index,
              }) => (
                <Box
                  style={[
                    index === 0 && globalStyles.ml5,
                    categories &&
                      index === categories.length - 1 &&
                      globalStyles.mr5,
                    categories &&
                      index < categories.length - 1 &&
                      globalStyles.mr3,
                  ]}>
                  <CategoryCard
                    title={title}
                    colorStops={{
                      start,
                      stop,
                    }}
                    titleStyle={[
                      globalStyles.textWhite,
                      globalStyles.textXl,
                      globalStyles.fontSemiBold,
                      globalStyles.leading6,
                      globalStyles.textCapitalise,
                    ]}
                  />
                </Box>
              )}
              estimatedItemSize={200}
            />
          </Box>

          <Box flex={1} style={[globalStyles.wFull, globalStyles.gapY5]}>
            <Box style={[globalStyles.px5]}>
              <SectionHeaderComponent title="For you" />
            </Box>

            <FlashList
              data={moviesForYou}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <Box
                  style={[
                    index === 0 && globalStyles.ml5,
                    trendingMovies &&
                      index === trendingMovies.length - 1 &&
                      globalStyles.mr5,
                    trendingMovies &&
                      index < trendingMovies.length - 1 &&
                      globalStyles.mr3,
                  ]}>
                  <MovieCard
                    key={index}
                    id={item.id}
                    title={item.title}
                    genres={item.genres
                      ?.filter(genre => !filteredGenre.includes(genre))
                      .slice(0, 2)}
                    cover={item.cover}
                    imageWidth={146}
                    imageHeight={220}
                    showGenre
                    imageStyles={[globalStyles.roundedLg]}
                    wrappeStyles={[globalStyles.gapY1p25]}
                    titleStyle={[
                      globalStyles.textWhite,
                      globalStyles.textSm,
                      globalStyles.fontSemiBold,
                      globalStyles.textCapitalise,
                      globalStyles.leading4,
                    ]}
                    genreStyle={[
                      globalStyles.textWhite,
                      globalStyles.textXs,
                      globalStyles.textCapitalise,
                      globalStyles.leading3p5,
                    ]}
                  />
                </Box>
              )}
              estimatedItemSize={200}
            />
          </Box>

          <Box flex={1} style={[globalStyles.wFull, globalStyles.gapY5]}>
            <Box style={[globalStyles.px5]}>
              <SectionHeaderComponent title="Drama" />
            </Box>

            <FlashList
              data={dramas}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <Box
                  style={[
                    index === 0 && globalStyles.ml5,
                    trendingMovies &&
                      index === trendingMovies.length - 1 &&
                      globalStyles.mr5,
                    trendingMovies &&
                      index < trendingMovies.length - 1 &&
                      globalStyles.mr3,
                  ]}>
                  <MovieCard
                    key={index}
                    id={item.id}
                    title={item.title}
                    genres={item.genres
                      ?.filter(genre => !filteredGenre.includes(genre))
                      .slice(0, 2)}
                    cover={item.cover}
                    imageWidth={146}
                    imageHeight={220}
                    showGenre
                    imageStyles={[globalStyles.roundedLg]}
                    wrappeStyles={[globalStyles.gapY1p25]}
                    titleStyle={[
                      globalStyles.textWhite,
                      globalStyles.textSm,
                      globalStyles.fontSemiBold,
                      globalStyles.textCapitalise,
                      globalStyles.leading4,
                    ]}
                    genreStyle={[
                      globalStyles.textWhite,
                      globalStyles.textXs,
                      globalStyles.textCapitalise,
                      globalStyles.leading3p5,
                    ]}
                  />
                </Box>
              )}
              estimatedItemSize={200}
            />
          </Box>

          <Box flex={1} style={[globalStyles.wFull, globalStyles.gapY5]}>
            <Box style={[globalStyles.px5]}>
              <SectionHeaderComponent title="Romance" />
            </Box>

            <FlashList
              data={continueWatching}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <Box
                  style={[
                    index === 0 && globalStyles.ml5,
                    trendingMovies &&
                      index === trendingMovies.length - 1 &&
                      globalStyles.mr5,
                    trendingMovies &&
                      index < trendingMovies.length - 1 &&
                      globalStyles.mr3,
                  ]}>
                  <MovieCard
                    key={index}
                    id={item.id}
                    title={item.title}
                    genres={item.genres
                      ?.filter(genre => !filteredGenre.includes(genre))
                      .slice(0, 2)}
                    cover={item.cover}
                    imageWidth={146}
                    imageHeight={220}
                    showGenre
                    imageStyles={[globalStyles.roundedLg]}
                    wrappeStyles={[globalStyles.gapY1p25]}
                    titleStyle={[
                      globalStyles.textWhite,
                      globalStyles.textSm,
                      globalStyles.fontSemiBold,
                      globalStyles.textCapitalise,
                      globalStyles.leading4,
                    ]}
                    genreStyle={[
                      globalStyles.textWhite,
                      globalStyles.textXs,
                      globalStyles.textCapitalise,
                      globalStyles.leading3p5,
                    ]}
                  />
                </Box>
              )}
              estimatedItemSize={200}
            />
          </Box>

          <Box flex={1} style={[globalStyles.wFull, globalStyles.gapY5]}>
            <Box style={[globalStyles.px5]}>
              <SectionHeaderComponent title="Documentary" />
            </Box>

            <FlashList
              data={documentaries}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <Box
                  style={[
                    index === 0 && globalStyles.ml5,
                    trendingMovies &&
                      index === trendingMovies.length - 1 &&
                      globalStyles.mr5,
                    trendingMovies &&
                      index < trendingMovies.length - 1 &&
                      globalStyles.mr3,
                  ]}>
                  <MovieCard
                    key={index}
                    id={item.id}
                    title={item.title}
                    genres={item.genres
                      ?.filter(genre => !filteredGenre.includes(genre))
                      .slice(0, 2)}
                    cover={item.cover}
                    imageWidth={146}
                    imageHeight={220}
                    showGenre
                    imageStyles={[globalStyles.roundedLg]}
                    wrappeStyles={[globalStyles.gapY1p25]}
                    titleStyle={[
                      globalStyles.textWhite,
                      globalStyles.textSm,
                      globalStyles.fontSemiBold,
                      globalStyles.textCapitalise,
                      globalStyles.leading4,
                    ]}
                    genreStyle={[
                      globalStyles.textWhite,
                      globalStyles.textXs,
                      globalStyles.textCapitalise,
                      globalStyles.leading3p5,
                    ]}
                  />
                </Box>
              )}
              estimatedItemSize={200}
            />
          </Box>
        </Box>
      </Box>
    </MainLayoutWithScroll>
  );
};

export default Home;
