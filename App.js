import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Image,
	TouchableOpacity,
	FlatList,
	Modal,
	ImageBackground,
	ScrollView,
} from 'react-native';
import axios from 'axios';

export default function App() {
	const apiUrl = 'https://api.themoviedb.org/3/';
	const apiKey = '?api_key=b7f261eb7873ccfee5e4fd0e6ff796d4';
	const [state, setState] = useState({
		searchFor: '',
		results: [],
		selected: {},
	});

	const search = () => {
		axios(apiUrl + 'search/movie' + apiKey + '&query=' + state.searchFor + '&page=1').then((res) => {
			setState((prevState) => {
				return { ...prevState, results: res.data.results };
			});
		});
	};
	const clear = () => {
		setState(() => {
			return { searchFor: '', results: [], selected: {} };
		});
	};
	const moreInfo = (result) => {
		axios(apiUrl + 'movie/' + result.id + apiKey).then((res) => {
			console.log(res.data);
			setState((prevState) => {
				return { ...prevState, selected: res.data };
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
					<Image
						style={styles.posters}
						source={{ uri: `https://image.tmdb.org/t/p/original${result.poster_path}` }}
						resizeMode="cover"
					/>
					<Text style={styles.resultTitle}>{result.original_title}</Text>
					<Text style={styles.resultYear}>
						{result.release_date ? result.release_date.split('-')[0] : ''}
					</Text>
				</TouchableOpacity>
			);
		}
	};
	const formatData = (data, numColumns) => {
		const numberOfFullRows = Math.floor(data.length / numColumns);

		let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
		while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
			data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
			numberOfElementsLastRow++;
		}

		return data;
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
							return { ...prevState, searchFor: text };
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
						data={formatData(state.results, 3)}
						style={styles.results}
						renderItem={renderItems}
					></FlatList>
				) : (
					<View style={styles.noContent}>
						<Text>We have found 0 movie title that contains {state.searchFor}</Text>
					</View>
				)
			) : (
				<View style={styles.noContent}>
					<Text>Start searching for movie details!</Text>
				</View>
			)}
			<Modal
				animationType="slide"
				transparent={false}
				visible={typeof state.selected.original_title !== 'undefined' ? true : false}
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
			<StatusBar barStyle="dark-content" hidden={false} backgroundColor="#9932CC" translucent={true} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	title: {
		paddingTop: 70,
		paddingHorizontal: 20,
		paddingBottom: 10,
		backgroundColor: '#000',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		width: '100%',
	},
	titleText: {
		fontSize: 32,
		color: '#fff',
	},
	searchBar: {
		height: 40,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	searchText: {
		fontSize: 20,
		padding: 10,
		backgroundColor: '#fff',
		flex: 9,
	},
	cancelType: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		flex: 1,
		color: '#000',
	},
	noContent: {
		backgroundColor: '#e6e6e6',
		height: '100%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	resultsContainer: {
		flex: 1,
		height: '100%',
	},
	results: {
		backgroundColor: '#e6e6e6',
		width: '100%',
	},
	result: {
		flex: 1,
		minHeight: 250,
		backgroundColor: '#fff',
		margin: 5,
		width: '100%',
		elevation: 5,
	},
	resultInvis: {
		backgroundColor: 'transparent',
		elevation: 0,
	},
	resultTitle: {
		fontWeight: 'bold',
		paddingHorizontal: 10,
	},
	resultYear: {
		fontWeight: '100',
		paddingHorizontal: 10,
	},
	posters: { width: '100%', height: 200 },
	backdrop: {
		flex: 1,
		resizeMode: 'cover',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalScroll: { height: '100%', width: '100%' },
	modalView: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 900,
	},
	modal: {
		width: '90%',
		backgroundColor: '#fff',
		minHeight: 300,
		elevation: 5,
		borderRadius: 5,
	},
	closeContainer: {
		height: 60,
		justifyContent: 'center',
		alignItems: 'flex-start',
		width: '100%',
	},
	closeButton: {
		color: '#fff',
		fontSize: 32,
		marginLeft: 20,
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 5,
		textShadowColor: '#000',
	},
	modalContent: {
		padding: 20,
	},
	modalTitle: {
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	modalSubtitle: {
		marginTop: 7,
		marginBottom: 3,
		fontSize: 20,
		fontWeight: '100',
		color: '#23272A',
	},
	modalText: {
		fontSize: 11,
		textAlign: 'justify',
	},
	modalSubtext: {
		fontSize: 15,
		marginVertical: 12,
	},
});
