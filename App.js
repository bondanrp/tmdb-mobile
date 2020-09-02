import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import styles from './styles';
import {
	Text,
	View,
	TextInput,
	Image,
	TouchableOpacity,
	FlatList,
	Modal,
	ImageBackground,
	ScrollView,
	ActivityIndicator,
} from 'react-native';
import axios from 'axios';

export default function App() {
	const apiUrl = 'https://api.themoviedb.org/3/';
	const apiKey = '?api_key=b7f261eb7873ccfee5e4fd0e6ff796d4';
	const [state, setState] = useState({
		searchFor: '',
		results: [],
		selected: {},
		typing: false,
		page: 1,
		loading: false,
	});

	const handleBackButtonClick = () => {
		setState((prevState) => {
			return { ...prevState, loading: false, selected: {} };
		});
		return true;
	};

	const search = () => {
		setState((prevState) => {
			return { ...prevState, loading: true };
		});
		axios(apiUrl + 'search/movie' + apiKey + '&query=' + state.searchFor + '&page=' + 1).then((res) => {
			setState((prevState) => {
				return { ...prevState, page: 1, loading: false, typing: false, results: res.data.results };
			});
		});
	};
	const loadMore = () => {
		const newPage = state.page + 1;
		axios(apiUrl + 'search/movie' + apiKey + '&query=' + state.searchFor + '&page=' + newPage).then((res) => {
			setState((prevState) => {
				return { ...prevState, page: prevState.page + 1, results: [...state.results, ...res.data.results] };
			});
		});
	};
	const clear = () => {
		setState(() => {
			return { searchFor: '', results: [], selected: {}, typing: false, page: 1, loading: false };
		});
	};
	const moreInfo = (result) => {
		setState((prevState) => {
			return { ...prevState, loading: true };
		});
		axios(apiUrl + 'movie/' + result.id + apiKey).then((res) => {
			setState((prevState) => {
				return { ...prevState, loading: false, selected: res.data };
			});
		});
	};
	const closeModal = () => {
		setState((prevState) => {
			return { ...prevState, selected: {} };
		});
	};
	const renderItems = (item, index) => {
		var result = item.item;
		if (result.empty === true) {
			return <View style={[styles.result, styles.resultInvis]} />;
		} else {
			return (
				<TouchableOpacity
					onPress={() => {
						moreInfo(result);
					}}
					style={styles.result}
					key={result.id}
				>
					{result.poster_path ? (
						<Image
							style={styles.posters}
							source={{ uri: `https://image.tmdb.org/t/p/original${result.poster_path}` }}
							resizeMode="cover"
						/>
					) : (
						<View style={styles.notAvailable}>
							<Text>No Poster</Text>
							<Text>Available</Text>
						</View>
					)}
					<Text style={styles.resultTitle}>{result.original_title}</Text>
					<Text style={styles.resultYear}>
						{result.release_date ? result.release_date.split('-')[0] : ''}
					</Text>
				</TouchableOpacity>
			);
		}
	};
	return (
		<View style={styles.container}>
			<View style={styles.title}>
				<Text style={styles.titleText}>TMDb</Text>
			</View>
			<View elevation={5} style={styles.searchBar}>
				<TextInput
					value={state.searchFor}
					onChangeText={(text) => {
						setState((prevState) => {
							return { ...prevState, typing: true, searchFor: text };
						});
					}}
					placeholder="Enter a movie title..."
					style={styles.searchText}
					onSubmitEditing={search}
				/>
				{state.searchFor ? (
					<TouchableOpacity onPress={clear} style={styles.cancelType}>
						<Text>X</Text>
					</TouchableOpacity>
				) : null}
			</View>
			{state.searchFor ? (
				state.results.length > 1 ? (
					<FlatList
						numColumns="3"
						data={state.results}
						style={styles.results}
						renderItem={renderItems}
						initialNumToRender={6}
						onEndReachedThreshold={5}
						onEndReached={loadMore}
					></FlatList>
				) : state.typing ? (
					<View style={styles.noContent}>
						<Text>Start searching for movies!</Text>
					</View>
				) : (
					<View style={styles.noContent}>
						<Text>We could not find a movie title that contains "{state.searchFor}"</Text>
					</View>
				)
			) : (
				<View style={styles.noContent}>
					<Text>Start searching for movies!</Text>
				</View>
			)}
			<Modal
				animationType="slide"
				transparent={false}
				visible={typeof state.selected.original_title !== 'undefined' ? true : false}
				onRequestClose={handleBackButtonClick}
			>
				<ImageBackground
					style={styles.backdrop}
					source={{
						uri: `https://image.tmdb.org/t/p/original${state.selected && state.selected.poster_path}`,
					}}
				>
					<View style={styles.closeContainer}>
						<TouchableOpacity onPress={closeModal}>
							<Text style={styles.closeButton}>✖</Text>
						</TouchableOpacity>
					</View>
					<ScrollView style={styles.modalScroll}>
						<View style={styles.modalView}>
							<View style={styles.modal}>
								<View style={styles.modalContent}>
									<Text style={styles.modalTitle}>{state.selected.original_title}</Text>
									<Text style={styles.modalSubtext}>
										📅{' '}
										{state.selected.release_date ? state.selected.release_date.split('-')[0] : '-'}
									</Text>
									<Text style={styles.modalSubtext}>
										🌐{' '}
										{state.selected.production_companies && state.selected.production_companies[0]
											? state.selected.production_companies.map((val, idx) => {
													return idx !== state.selected.production_companies.length - 1
														? val.name + ', '
														: val.name;
											  })
											: '-'}
									</Text>
									<Text style={styles.modalSubtitle}>TAGLINE</Text>
									<Text style={styles.modalText}>
										{state.selected.tagline ? state.selected.tagline : '-'}
									</Text>
									<Text style={styles.modalSubtitle}>OVERVIEW</Text>
									<Text style={styles.modalText}>
										{state.selected.overview ? state.selected.overview : '-'}
									</Text>
									<Text style={styles.modalSubtitle}>GENRE</Text>
									<Text style={styles.modalText}>
										{state.selected.genres && state.selected.genres[0]
											? state.selected.genres.map((val, idx) => {
													return idx !== state.selected.genres.length - 1
														? val.name + ', '
														: val.name;
											  })
											: ''}
									</Text>
								</View>
							</View>
						</View>
					</ScrollView>
				</ImageBackground>
			</Modal>
			<Modal animationType="fade" transparent visible={state.loading} onRequestClose={handleBackButtonClick}>
				<View style={styles.loadingModal}>
					<View style={styles.spinner}>
						<ActivityIndicator size="large" color="#000" />
					</View>
				</View>
			</Modal>
			<StatusBar barStyle="dark-content" hidden={false} backgroundColor="#9932CC" translucent={true} />
		</View>
	);
}
