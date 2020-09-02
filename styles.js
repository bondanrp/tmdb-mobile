import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
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
	notAvailable: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f1f1f1',
		height: 200,
		textAlign: 'center',
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
	},
	modalSubtitle: {
		marginTop: 7,
		marginBottom: 3,
		fontSize: 14,
		fontWeight: 'bold',
		color: '#23272A',
	},
	modalText: {
		fontSize: 14,
		fontWeight: 'normal',
		textAlign: 'justify',
		fontStyle: 'italic',
	},
	modalSubtext: {
		fontSize: 15,
		marginVertical: 12,
	},
	loadingModal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	spinner: {
		backgroundColor: '#fff',
		padding: 20,
		elevation: 20,
		borderRadius: 10,
	},
	modalTitleRating: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});
