import './App.css';
import OverlayComponent from './components/OverlayComponent';
// import HlsPlayer from './components/HlsPlayer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <HlsPlayer src="http://localhost:3000/hls/stream.m3u8" /> */}
        {/* <HlsPlayer src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" /> */}
        <h1>Live stream</h1>
      </header>
      <OverlayComponent />
    </div>
  );
}

export default App;
